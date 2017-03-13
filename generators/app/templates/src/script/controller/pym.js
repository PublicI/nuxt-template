
export default {
    init() {
        if (typeof document !== 'undefined') {
            window.addEventListener('resize',this.sendHeight.bind(this,{}));

            setInterval(this.sendHeight.bind(this,{}),200);
        }
    },
    sendHeight(opts) {
        const heights = [];

        if (typeof document !== 'undefined' && typeof parent !== 'undefined' && parent) {
            const height = document.body.offsetHeight;

            if (typeof opts == 'undefined' || !opts) {
                opts = {};
            }

            opts.height = height+10;

            parent.postMessage(opts, "*");
            
            heights.unshift(height+10);

            if (heights.length > 5) {
                heights.pop();
            }
        }
    },
    scrollTo(num) {
        this.sendHeight({
            scrollTo: num
        });
    },
    setHash(route) {
        this.sendHeight({
            route
        });
    }
};
