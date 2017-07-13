module.exports = ({ file, options, env }) => ({
    plugins: [
        require('autoprefixer')({
            browsers: ['> 5%', 'iOS >= 8', 'Safari >= 8', 'ie >= 10'],
            cascade: false
        })
    ]
});