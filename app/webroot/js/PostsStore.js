/**
 * Created by IntelliJ IDEA.
 * User: juliusmercons
 * Date: 4/5/12
 * Time: 2:14 PM
 * To change this template use File | Settings | File Templates.
 */

PostsStore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        PostsStore.superclass.constructor.call(this, Ext.apply({
            autoLoad: true,
            id: 'PostsStore',
            storeId: 'PostsStore',
            url: '/DCIS/posts/jsonList',
            fields: [
                {
                    name: 'id'
                },
                {
                    name: 'title'
                },
                {
                    name: 'body'
                }
            ]
        }, cfg));
    }
});