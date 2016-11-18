/**
 * Created by chuck on 2016/11/18.
 */
var Model = {
    inherited: function () {

    },
    created: function () {

    },

    prototype: {
        init: function () {

        }
    },
    /**
     * 用来创建新模型
     * @return {Object}
     */
    create: function () {
        var object = Object.create(this);
        object.parent = this;
        object.prototype = object.fn = Object.create(this.prototype);

        object.created();
        this.inherited(object);
        return object;
    },

    /**
     * 用来创建实例
     * @return {Object}
     */
    init: function () {
        var instance = Object.create(this.prototype);
        instance.parent = this;
        instance.init.apply(instance, arguments);
        return instance;
    },

    // 扩展对象属性
    extend: function (o) {
        var extended = o.extended; // extended是一个回调
        jQuery.extend(this, o);
        if (extended) extended(this);
    },

    // 扩展实例属性
    include: function (o) {
        var included = o.included; // include也是回调
        jQuery.extend(this.prototype, o);
        if (included) included(this);
    }
}

/*

/!**
 * 添加对象属性
 *!/
jQuery.extend(Model, {
    find: function () {

    }
})


/!**
 * 添加实例对象
 *!/
jQuery.extend(Model.prototype, {
    init: function (atts) {
        if (atts) this.load(atts);
    },

    load: function (attributes) {
        for (var name in attributes) {
            this[name] = attributes[name];
        }
    }
})
*/

// 添加对象属性
Model.extend({
    find: function () {

    }
});

// 添加实例属性
Model.include({
    init: function (atts) {
        if (atts) this.load(atts);
    },
    load: function (attributes) {
        for (var name in attributes) {
            this[name] = attributes[name];
        }
    }
});

// 持久化记录
//保存资源的对象
Model.records = {};

Model.include({
    newRecord: true,

    create: function () {
        this.newRecord = false;
        this.parent.records[this.id] = this;
    },

    destroy: function () {
        delete this.parent.records[this.id];
    }
});

Model.include({
    update: function () {
        this.parent.records[this.id] = this;
    }
});

// 将对象存入hash记录中， 保持一个引用指向它
Model.include({
    save: function () {
        this.newRecord ? this.create() : this.update();
    }
});

Model.extend({
    // 通过ID查找， 找不到则抛出异常
    find: function (id) {
        if (this.records[id])
            return this.records[id];
        else
            throw("Unknown record");
    }
});

// 生成GUID
Math.guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    }).toUpperCase();
}

Model.include({
    create: function () {
        if (!this.id) this.id = Math.guid();
        this.newRecord = false;
        this.parent.records[this.id] = this;
    }
})