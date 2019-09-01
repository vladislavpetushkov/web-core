import { EthereumRPC } from './EthereumRPC';
import { getEnv } from '../utils';

describe('EthereumRPC', () => {
    let rpc: EthereumRPC;
    let address1: string;
    let address2: string;
    let tx: string;

    beforeAll(() => {
        require('dotenv').config({ path: __dirname + '/./.env' });
        rpc = new EthereumRPC(getEnv('GETH_RPC_URL'));
        address1 = '0xc94770007dda54cF92009BFF0dE90c06F603a09f';
        address2 = '0x530d2A8BA8D71E359AdBD4Dc68E289d6f91c4283';
        tx = '0x36fa29b6bb88731d2abf97a820708833e96a05474766d079bdec49a88b44a607';
    });

    it('should get last block', async () => {
        let block = await rpc.getBlockHeight();
        expect(block.toNumber()).toBeGreaterThan(0);
    });

    it('should get balance', async () => {
        const balance = await rpc.getAccountBalance(address1);
        expect(balance.toNumber()).toBeGreaterThan(0);
    });

    it('should get tx detail', async () => {
        expect((await rpc.getTransactionDetail(tx)).from).toBeTruthy();
    });

    it('should get estimated gas limit', async () => {
        const estimated = await rpc.estimateGasLimit(
            address1,
            address2,
            1000000000000000,
            12000000000,
            '0xf6cb4587000000000000000000000000339a3f3e18afebecd67ba488ded47efadb6e8171',
        );
        expect(estimated.toNumber()).toBeGreaterThan(0);
    });

    it('should get gas price', async () => {
        expect((await rpc.getGasPrice()).toNumber()).toBeGreaterThan(0);
    });

    it('should get token balances', async () => {
        const balances = await rpc.getAllTokenBalances([address1, address2]);
        expect(Object.keys(balances).length).toBe(2);
    });

    it('should get estimate nonce', async () => {
        expect((await rpc.estimateNonce(address1)).toNumber()).toBeGreaterThan(0);
    });

    it('should get broadcast transaction', async done => {
        const data =
            '0100000000010ae14d6d279f01555e531e325667bcfbd4a51f5369aa3d0345d3e9c6a1d6a4a3f80000000000000000000b1511aed8d2ffaf1bbf1d43c3265513916219c4d9fa258f2f5c46f51392b56c010000000000000000f8ae0d9797cba4e790483659fc55a2d7d943b57980bb84aa996d80cc90640a270000000000000000007a145d0f10bdc540773434442353e1b61f87fc58acec044914ea6f082125535c0000000000000000002a495a252f2a067ca36618da86350289c027aa454fa61969e65e1cd80a7656a4000000000000000000f81a3add1f98d31e57473dc1dee24c914949140aabdf8fba7eacb61be5cc913e0000000000000000008c6ea5fa8b16f4a786b45c23dd5f759dd3dc94b66de15c3aa7b33adc3abe0d65000000000000000000a407a70c021d5a210f2f91b83980667786ad26e550bf902265a520a7c63d87880000000000000000000b1511aed8d2ffaf1bbf1d43c3765513916219c4d9fa258f2f5c46f51392b56c000000000000000000a38fc8083b38b8fb095ba1178a12f186427cfb36b411a22b3a84b461864d8335010000000000000000012957000000000000160014974673d158ac6fe8f1be29a5fe1159f0319a1c39024730440220753be50b6e2b0e878594435f4f6f5ded392f144246862cb120998e31d05b9d1a02204b9a87776a0234f393a9c6d58e093b2ac90d6b7d55628fe3512a816bc3141d48012102cac4dcf0eccebb3b8e5b10a0e10c5e2350a7e2b2c2591f05b0f85511dab482fc024730440220732023bc2dbbdec8da6aaff361aa798a7379c2a922e3d7b49f39a6bff115e0af022024a3b014eea0a9e9195d57248c5263e23df215d5b4047d06714ff8dbb199b5c70121029261525063905ff3ae58f5497c9e4d90c6d54cf68d46e01877a8119691cc39940248304502210084e30d2e192921eeac14434add4ecd128894df76dc5d118a6af3154d39f300b30220194e2bb28937975b09617a4539f93c66b708cec97edd5c3e92c8a551729a349701210261cf39d7fb7f3ab145f553b654164b86917a64078e558d47c30a7a99f3b7212d02483045022100e9784824e8f8b27af016f5902bb80ef665d0ac6ffb290f463e363cf8b0acef250220399fd5c2d52595937b499c99303a627bcfee853a8b3f18953c82cbaa31d2584b0121028f029b2c38409e68873ebf07431ffa9e71f9a21104c6cddd694dab3607bcfdd602483045022100d9d552d1f06f35dab0762b23502b43200bef6ae42454cc81e43b9c431fbec09e022063e4ee10c4fc6660e21bda6591f6ebc1cd5ad286f10ade5794e12339b2ad64c501210308c0793b4f8fa2c3c98047003d52b21dcce8be18bb99d0f5576cd60504ac544c0248304502210096633c649389c04fbc50785ec2a9df696567a07b0be913039871fc543a37149f022020f9e111ee8d732a856df39cf84a7ac35770a821d6458f6c06c4cc04120ca3b501210297ccb3f9b315f07e38022afd7434f196fb9ff31e45961a2fda4b6362ce32dac6024730440220569f3181d14a4017229cda2639ea31ff9b7d262adf15e0cbe6eccb63f11f0a30022075deb0d6289eed0a7b982a64dda813c9daab8f64da46fdebdaa7f12fd07069d8012102bc7a575c577e7a5d1abae2d2755b07e027008b8f15ebf2f43db23a4d49c49bf802483045022100eb2a61289da714e0a41f9b4ec0fa91dcc6f3d6b092e173f4cb772a3426c9f47602200219184628242e0560211fd71032c260a41ec5a507b271f3ed4b66127b4387b10121033910ba10b8cb78b3fce0ce1a3810869a25151bd162f1b0d20d54bca5c5e8ceb802483045022100cb854b2ed13b43c204f07f54156862be6222523c18c398379746d9b3f8d9e4260220783afed45ae1529beaea23ebecb7a87aef4a770059d434e834e256693690650101210271b8cf7b1845bb4615c40d9049ecac0ef06e86e9806640743ee1a4dd31f96dd3024730440220393c4666a33c9a2653ae0664296d749c40bdfc60f7c7759d544dd62a50f3711f02205fc3ac1fcf9733bb143140a6bea284973cf4c103893e5c3915f0b49bd166456c01210221a110c08c9ba07f547bcad9b9860b804fe1115490a81478b2bd0fe52d90118d00000000';
        try {
            await rpc.broadcastTransaction(data);
            done.fail(`Something went wrong. Tx should not be broadcasted`);
        } catch (e) {
            done();
        }
    });
});
