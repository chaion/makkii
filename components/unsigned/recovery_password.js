import React, {Component} from 'react';
import {Dimensions, Keyboard,TouchableOpacity,View,Text, Alert} from 'react-native';
import {PasswordInputWithTitle, UnsignedActionButton, ComponentButton} from '../common.js';
import {connect} from 'react-redux';
import {hashPassword,validatePassword} from '../../utils.js';
import {user} from '../../actions/user.js';
import styles from '../styles.js';
import {strings} from "../../locales/i18n";

const {width,height} = Dimensions.get('window');

class Password extends Component {
	static navigationOptions = ({ navigation }) => {
	    return {
	       	title: strings('recovery_password.title'),
	    };
    };
	constructor(props){
		super(props);
		this.mnemonic = this.props.navigation.getParam('mnemonic', '');
		this.state = {
			password: '',
			password_confirm: '',
		}
	}
	async componentDidMount(){
		console.log('[route] ' + this.props.navigation.state.routeName);
	}

	render(){
		const {dispatch} = this.props;
		return (
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => {Keyboard.dismiss()}}
				style={{
					flex: 1,
					padding: 40,
				}}
			>
				<View style={{
					marginBottom: 40,
					width: width - 80,
					height: 220,
					borderRadius: 10,
					backgroundColor: 'white',
					elevation: 3,
					padding: 20,
				}}>
					<PasswordInputWithTitle
						title={strings('recovery_password.label_password')}
                        placeholder={strings('recovery_password.hint_enter_password')}
						value={this.state.password}
						onChange={e=>{
							this.setState({
								password: e
							});
						}}
					/>
					<View style={{marginBottom: 20}} />
					<PasswordInputWithTitle
                        title={strings('recovery_password.label_confirm_password')}
						placeholder={strings('recovery_password.hint_enter_confirm_password')}
						value={this.state.password_confirm}
						onChange={e=>{
							this.setState({
								password_confirm: e
							});
						}}
                    />
				</View>
				<UnsignedActionButton
					title={strings('recovery_password.button_reset')}
					onPress={e=>{
						if (!validatePassword(this.state.password)) {
						    Alert.alert(strings('alert_title_error'), strings('recovery_password.error_password'));
						} else if (this.state.password !== this.state.password_confirm) {
							Alert.alert(strings('alert_title_error'), strings('recovery_password.error_dont_match'));
						} else {
							let hashed_password = hashPassword(this.state.password);
							dispatch(user(hashed_password, this.mnemonic));
							console.log('hashed_password: ',this.state.password);
							console.log('mnemonic: ', this.mnemonic);
							this.setState({
								password: '',
								password_confirm: '',
							});
						    this.props.navigation.navigate('signed_vault');
						}
					}}
				/>
			</TouchableOpacity>
		);
	}
}

export default connect()(Password);
