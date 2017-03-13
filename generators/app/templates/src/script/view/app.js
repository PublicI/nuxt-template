import pym from '../controller/pym';
import template from '../../view/app.html';
import overview from './overview';

export default {
    components: {
        overview: overview
    },
    el: '#<%= s.camelize(props.appname,true) %>',
    render: template.render,
    staticRenderFns: template.staticRenderFns,
    created() {
        pym.init();
    }
};
