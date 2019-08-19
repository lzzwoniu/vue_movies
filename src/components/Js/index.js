import Vue from "vue"
import ShowToast from "./showToast/showtoast"

export var messageBox = (function(){
  var defaults = {
    title: '',
    content: '',
    cancel: '',
    ok: '',
    handleCancel:null,
    handleOk:null
  }

  var myComponent = Vue.extend(ShowToast)

  return function(opts){
    for(var attr in opts){
      defaults[attr] = opts[attr]
    }

    var vm = new myComponent({
      el : document.createElement('div'),
      data : {
        title : defaults.title,
        content : defaults.content,
        cancel : defaults.cancel,
        ok : defaults.ok
      },
      methods:{
        handleCancel(){
          defaults.defaults && defaults.defaults.call(this)
          document.body.removeChild( vm.$el );
        },
        handleOk(){
          defaults.handleOk && defaults.handleOk.call(this);
          document.body.removeChild( vm.$el );
        }
      }
    })
    document.body.appendChild( vm.$el );
  }

})()