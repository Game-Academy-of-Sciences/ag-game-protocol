import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import JavaScriptObfuscator from 'webpack-obfuscator'

const config:webpack.Configuration = {
    mode: 'production',
    entry: './utils/logic.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: false,
    plugins: [
        
        new JavaScriptObfuscator({
            compact: true,//压缩代码
            controlFlowFlattening: true,//是否启用控制流扁平化(降低1.5倍的运行速度)
            controlFlowFlatteningThreshold: 1,//应用概率;在较大的代码库中，建议降低此值，因为大量的控制流转换可能会增加代码的大小并降低代码的速度。
            deadCodeInjection: true,//随机的死代码块(增加了混淆代码的大小)
            deadCodeInjectionThreshold: 1,//死代码块的影响概率
            // @ts-ignore
            identifierNamesGenerator: 'hexadecimal',//标识符的混淆方式 hexadecimal(十六进制) mangled(短标识符)
            log: true,
            renameGlobals: true,//是否启用全局变量和函数名称的混淆
            rotateStringArray: true,//通过固定和随机（在代码混淆时生成）的位置移动数组。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
            selfDefending: true,//混淆后的代码,不能使用代码美化,同时需要配置 cpmpat:true;
            stringArray: true,//删除字符串文字并将它们放在一个特殊的数组中
            // @ts-ignore
            stringArrayEncoding: 'rc4',
            stringArrayThreshold: 1,
            transformObjectKeys: false,
            unicodeEscapeSequence: true//允许启用/禁用字符串转换为unicode转义序列。Unicode转义序列大大增加了代码大小，并且可以轻松地将字符串恢复为原始视图。建议仅对小型源代码启用此选项。
        }, []),
        
        new HtmlWebpackPlugin({
            inject: 'head',
            minify: false,
            template: './index.html'
        })
    ]
};

export default config;