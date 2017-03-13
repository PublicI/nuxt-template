import template from '../../view/example.html';
import exampleModel from '../model/example';
import exampleController from '../controller/example';

exampleModel.actions = exampleController;

export default {
    vuex: exampleModel,
    render: template.render,
    staticRenderFns: template.staticRenderFns
};
