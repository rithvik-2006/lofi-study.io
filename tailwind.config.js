module.exports = {
    theme: {
        extend: {
            animation: {
                'border-shine': 'border-shine 3s linear infinite',
            },
            keyframes: {
                'border-shine': {
                    'from': { backgroundPosition: '0% 0%' },
                    'to': { backgroundPosition: '100% 100%' },
                },
            },
        },
    },
};