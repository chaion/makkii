
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View,Dimensions, FlatList, PixelRatio, ScrollView} from 'react-native';
import AionCell from '../../cell.js';
import {strings} from '../../../locales/i18n';
import {SETTINGS} from './constants';
import {mainBgColor} from "../../style_util";
import defaultStyles from '../../styles';
import {createAction, popCustom} from "../../../utils/dva";

const {width} = Dimensions.get('window');

class Home extends Component {
	static navigationOptions = ({ navigation,screenProps:{t,lang} }) => {
	    return {
			title: t('menuRef.title_settings',{locale:lang})
	    };
    };
	constructor(props){
		super(props);
	}

	toRecoveryPhrase=(route_url)=>{
		const {navigationSafely} =  this.props.screenProps;
		const {isBackUp, navigation} = this.props;
		if(isBackUp){
			navigationSafely({routeName:route_url})(this.props);
		}else{
			navigationSafely({onVerifySuccess:()=>{
				popCustom.show(
					strings('alert_title_warning'),
					strings('backup.label_remainder_backup'),
					[
						{
							text:strings('backup.button_backup_later'),
							onPress: ()=>{}
						},
						{
							text:strings('backup.button_backup_now'),
							onPress: ()=>{
								navigation.navigate('signed_backup_tips', {targetRoute: 'signed_setting'})
							}

						}
					]
					)
				}})(this.props);
		}
	};



	render(){
		const {navigation,dispatch} = this.props;
		const {navigationSafely} =  this.props.screenProps;
		return (
			<View style={{
				backgroundColor: mainBgColor,
				flex:1,
				alignItems: 'center'
			}}>
				<ScrollView
					style={{width:width}}
					contentContainerStyle={{alignItems: 'center'}}
				>
					<View style={{
						...defaultStyles.shadow,
						marginTop: 20,
						width: width - 40,
						borderRadius: 5,
						backgroundColor: 'white',
						paddingLeft: 10,
						paddingRight: 10,
					}} >
						<FlatList
							data={SETTINGS}
							renderItem={({item})=>
								<AionCell
									title={strings(item.title)}
									leadIcon={item.icon}
									onClick={() => {
										if(item.title==='recovery_phrase.title'){
											this.toRecoveryPhrase(item.route_url);
										}else {
											navigation.navigate(item.route_url);
										}
									}}
								/>
							}
							ItemSeparatorComponent={() =>
								<View style={{ height: 1 / PixelRatio.get(), backgroundColor: 'lightgray' }} />
							}
							keyExtractor={(item, index) => index.toString()}
						/>
					</View>
					<View style={{
						...defaultStyles.shadow,
						marginTop: 20,
						marginBottom:10,
						width: width - 40,
						borderRadius: 5,
						backgroundColor: 'white',
						paddingLeft: 10,
						paddingRight: 10,
					}} >
						<AionCell
							bottomSeparator={false}
							topSeparator={false}
							leadIcon={require('../../../assets/icon_signout.png')}
							title={strings('logout')}
							onClick={() => {
								popCustom.show(
									strings('alert_title_warning'),
									strings('setting.confirm_logout'),
									[
										{text: strings('cancel_button'), onPress:()=>{}},
										{text: strings('alert_ok_button'), onPress:()=>{
												dispatch(createAction('userModel/logOut')());
											}},
									]
								);
							}}/>
					</View>
				</ScrollView>
			</View>
		);
	}
}
const mapToState = ({settingsModel, userModel})=>({
	lang:settingsModel.lang,
	isBackUp: userModel.isBackUp,
});
export default connect(mapToState)(Home);
