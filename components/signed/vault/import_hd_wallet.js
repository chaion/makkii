import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Dimensions,
    PixelRatio,
    ActivityIndicator,
    InteractionManager,
    DeviceEventEmitter
} from 'react-native';
import {connect} from 'react-redux';
import {AionAccount} from "../../../libs/aion-hd-wallet";
import {accounts_add} from "../../../actions/accounts";
import SelectList from '../../selectList';
import {ImportListItem, ImportListfooter} from "../../common";
import {strings} from '../../../locales/i18n';
const {width} = Dimensions.get('window');

class ImportHdWallet extends React.Component {
    static navigationOptions = ({navigation})=> {
        return ({
            title: strings('import_master_key.title'),
            headerTitleStyle: {
                fontSize: 14,
                alignSelf: 'center',
                textAlign: 'center',
                flex: 1,
            },   
            headerRight: (
                <TouchableOpacity onPress={() => {
                    let acc = navigation.state.params.ImportAccount();
                    navigation.state.params.dispatch(accounts_add(acc,navigation.state.params.hashed_password));
                    DeviceEventEmitter.emit('updateAccountBalance');
                    navigation.navigate('signed_vault');
                }}>
                    <View style={{marginRight: 10}}>
                        <Text style={{color: 'blue'}}>{strings('import_button')}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
    };

    constructor(props){
        super(props);
        this.selectList=null;
        this.state={
            isLoading: true,
            hardenedIndex: 0,
            error: false,
            errInfo: '',
            accountsList: {},
            footerState: 0,
        };
    }

    ImportAccount= () => {
        return this.selectList.getSelect();
    };

    componentDidMount() {
        // setTimeout(()=>{this.fetchAccount(10)},500);
        InteractionManager.runAfterInteractions(()=>{
            this.fetchAccount(20)
        });
    }


    componentWillMount(): void {
        const {dispatch} = this.props;
        this.props.navigation.setParams({
            ImportAccount : this.ImportAccount,
            dispatch: dispatch,
            hashed_password: this.props.user.hashed_password,
        });
    }

    isAccountIsAlreadyImport(address){
        return typeof this.props.accounts[address] !== 'undefined';
    }
    fetchAccount(n){
        //fetch n Accounts from MasterKey;
        return new Promise((resolve, reject) => {
            try{
                let masterKey = AionAccount.recoverAccount(this.props.user.mnemonic)
                let accounts = {};
                let i = this.state.hardenedIndex;
                let sum = 0;
                while (sum < n) {
                    let getAcc = masterKey.deriveHardened(i);  
                    let acc = {};
                    acc.address = getAcc.address;
                    acc.private_key = getAcc.private_key;
                    acc.balance = 0;
                    acc.name = strings('default_account_name');
                    acc.type = '[local]';
                    acc.transactions = {};
                    if (!this.isAccountIsAlreadyImport(acc.address)) {
                        sum = sum + 1;
                        accounts[acc.address] = acc
                    }
                    i = i + 1;
                }
                resolve({'accountsList': accounts, 'hardenedIndex':this.state.hardenedIndex + n })
            }catch (e) {
                reject(e)
            }
        }).then(value => {
            this.setState({
                isLoading: false,
                accountsList: Object.assign(this.state.accountsList, value.accountsList),
                hardenedIndex: value.hardenedIndex,
                footerState: 0,
            });
        },err=>{
            this.setState({
                error: true,
                errInfo: err.toString(),
            });
        });
    }

    _onEndReached(){
        // if not in fetching account
        if (this.state.footerState !== 0){
            return;
        }
        // set footer state
        this.setState({
            footerState: 2,
        },()=>{setTimeout(()=>this.fetchAccount(5),500)});
        console.log('after')
    }


    // loading page
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    color='red'
                    size="large"
                />
            </View>
        );
    }

    //error page
    renderErrorView() {
        return (
            <View style={styles.container}>
                <Text style={{alignSelf: 'center', textAlign:'center'}}>
                    {this.state.errInfo}
                </Text>
            </View>
        );
    }


    renderData(){
        return (
            <View style={styles.container}>
                <SelectList
                    isMultiSelect={true}
                    itemHeight={55}
                    ref={ref=>this.selectList=ref}
                    data={this.state.accountsList}
                    cellLeftView={item=>{
                        const address = item.address;
                        return(
                            <Text style={{flex:1}}>{address.substring(0, 10) + '...'+ address.substring(54)}</Text>
                        )}}
                    ListFooterComponent={()=>
                        <ImportListfooter
                            footerState={this.state.footerState}
                        />
                    }
                    onEndReached={()=>{this._onEndReached()}}
                    onEndReachedThreshold={0.1}
                />
            </View>
        )
    }


    render() {
        // if first loading
        if (this.state.isLoading && !this.state.error) {
            return this.renderLoadingView();
        } else if (this.state.error) {
            //if error
            return this.renderErrorView();
        }
        //show data
        return this.renderData();
    }
}
export default connect( state => {
  return {
      accounts: state.accounts,
      user: state.user,
  };
})(ImportHdWallet);

const styles=StyleSheet.create({
    divider: {
        marginLeft: 80,
        height: 1 / PixelRatio.get(),
        backgroundColor: '#000'
    },
    container:{
        width: width,
        flex:1,
        justifyContent: 'center',
        backgroundColor: '#eeeeee'
    },
    itemContainer:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        backgroundColor:'#fff'
    },
    itemImage:{
        marginRight: 20,
        width: 50,
        height: 50,
    },
    itemText:{
        textAlign: 'right',
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
        marginTop: 10,
    }

});