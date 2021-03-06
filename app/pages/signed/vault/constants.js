import { strings } from '../../../../locales/i18n';

const SORT = [
    {
        title: 'sort.balance',
        image: require('../../../../assets/icon_sort_by_balance.png'),
    },
    {
        title: 'sort.transaction',
        image: require('../../../../assets/icon_sort_by_transactions.png'),
    },
];

const FILTER = [
    {
        title: 'filter.all',
        image: require('../../../../assets/account_all_symbol.png'),
    },
    {
        title: 'filter.masterKey',
        image: require('../../../../assets/account_mk_symbol.png'),
    },
    {
        title: 'filter.privateKey',
        image: require('../../../../assets/account_pk_symbol.png'),
    },
    {
        title: 'filter.ledger',
        image: require('../../../../assets/account_le_symbol.png'),
    },
];

const MENU = [
    {
        title: 'wallet.menu_master_key',
        image: require('../../../../assets/account_mk_symbol.png'),
    },
    {
        title: 'wallet.menu_private_key',
        image: require('../../../../assets/account_pk_symbol.png'),
    },
    {
        title: 'wallet.menu_ledger',
        image: require('../../../../assets/account_le_symbol.png'),
    },
];

const ACCOUNT_MENU = [
    {
        title: 'account_view.menu_change_name',
        image: require('../../../../assets/icon_account_edit.png'),
    },
    {
        title: 'account_view.menu_export_private_key',
        image: require('../../../../assets/icon_account_export.png'),
    },
    {
        title: 'account_view.menu_token_exchange',
        image: require('../../../../assets/icon_token_exchange.png'),
    },
];

const COINS = {
    AION: {
        name: 'AION',
        symbol: 'AION',
        icon: require('../../../../assets/coin_aion.png'),
        tokenSupport: true,
        gasPriceUnit: 'AMP',
        defaultGasPrice: '10',
        defaultGasLimit: '21000',
        defaultGasLimitForContract: '90000',
    },
    BTC: {
        name: 'BITCOIN',
        symbol: 'BTC',
        icon: require('../../../../assets/coin_btc.png'),
        tokenSupport: false,
        gasPriceUnit: '',
    },
    ETH: {
        name: 'ETHEREUM',
        symbol: 'ETH',
        icon: require('../../../../assets/coin_eth.png'),
        tokenSupport: false,
        gasPriceUnit: 'Gwei',
        defaultGasPrice: '20',
        defaultGasLimit: '21000',
    },
    EOS: {
        name: 'EOS',
        symbol: 'EOS',
        icon: require('../../../../assets/coin_eos.png'),
        tokenSupport: false,
        gasPriceUnit: '',
    },
    LTC: {
        name: 'LITECOIN',
        symbol: 'LTC',
        icon: require('../../../../assets/coin_ltc.png'),
        tokenSupport: false,
        gasPriceUnit: '',
    },
    TRON: {
        name: 'TRON',
        symbol: 'TRX',
        icon: require('../../../../assets/coin_trx.png'),
        tokenSupport: false,
        gasPriceUnit: '',
    },
};

const IMPORT_SOURCE = [
    {
        title: 'vault_import_source.create',
        icon: require('../../../../assets/account_mk_symbol.png'),
    },
    {
        title: 'vault_import_source.from_private_key',
        icon: require('../../../../assets/account_pk_symbol.png'),
    },
    {
        title: 'vault_import_source.from_keystore',
        icon: require('../../../../assets/account_pk_symbol.png'),
    },
    {
        title: 'vault_import_source.from_bip38',
        icon: require('../../../../assets/coin_btc.png'),
    },
    {
        title: 'vault_import_source.from_WIF',
        icon: require('../../../../assets/icon_letter_w.png'),
    },
    {
        title: 'vault_import_source.from_ledger',
        icon: require('../../../../assets/account_le_symbol.png'),
    },
    {
        title: 'vault_import_source.from_view_only_address',
        icon: require('../../../../assets/icon_address_only.png'),
    },
];

const EXPORT_WAY = [
    {
        title: 'vault_export_way.to_private_key',
        icon: require('../../../../assets/account_pk_symbol.png'),
    },

    {
        title: 'vault_export_way.to_bip38',
        icon: require('../../../../assets/coin_btc.png'),
    },
    {
        title: 'vault_export_way.to_wif',
        icon: require('../../../../assets/icon_letter_w.png'),
    },
];

const getAccountConstants = type => {
    let typeIcon;
    let typeText;
    switch (type) {
        case '[ledger]':
            typeIcon = require('../../../../assets/account_le_symbol.png');
            typeText = strings('vault_import_source.from_ledger');
            break;
        case '[pk]':
            typeIcon = require('../../../../assets/account_pk_symbol.png');
            typeText = strings('vault_import_source.from_private_key');
            break;
        case '[view only]':
            typeIcon = require('../../../../assets/icon_address_only.png');
            typeText = strings('vault_import_source.from_view_only_address');
            break;
        default:
            typeIcon = require('../../../../assets/account_mk_symbol.png');
            typeText = strings('vault_import_source.from_hd_wallet');
    }
    return { typeIcon, typeText };
};

module.exports = {
    EXPORT_WAY,
    SORT,
    FILTER,
    MENU,
    ACCOUNT_MENU,
    COINS,
    IMPORT_SOURCE,
    getAccountConstants,
};
