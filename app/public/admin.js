'use strict';

const myApp = angular.module('myApp', ['ng-admin']);

function createUsersList(nga) {
    const userList = nga.entity('users');

    userList.listView().fields([
        nga.field('name').isDetailLink(true),
        nga.field('username'),
        nga.field('email')
    ]);

    userList.creationView().fields([
        // nga.field('name'),
        // nga.field('username'),
        // nga.field('email', 'email'),
        // nga.field('address.street').label('Street'),
        nga.field('country', 'choice').choices([
            {value: 'FR', label: 'France'},
            {value: 'US', label: 'USA'},
        ]),
        nga.field('city', 'choice').choices((entry) => {
            const cities = [
                {country: 'FR', value: 'Paris', label: 'Paris'},
                {country: 'FR', value: 'Nancy', label: 'Nancy'},
                {country: 'US', value: 'NY', label: 'New York'},
                {country: 'US', value: 'SF', label: 'San Francisco'}
            ];

            return cities.filter((city) => {
                return city.country === entry.values.country;
            });
        }),
        nga.field('address.zipcode').label('Zipcode').validation({pattern: '[A-Z\-0-9]{5,10}'}),
        // nga.field('phone'),
        // nga.field('website')
    ]);

    userList.editionView().fields(userList.creationView().fields());

    return userList;
}

function createPostsList(nga, user) {
    const postsList = nga.entity('posts');
    postsList.listView().fields([
        nga.field('id'),
        nga.field('title'),
        nga.field('userId', 'reference')
            .targetEntity(user)
            .targetField(nga.field('username'))
            .label('User')
    ]);

    return postsList;
}

myApp.config(['NgAdminConfigurationProvider', function(nga) {
    const admin = nga.application('Admin');

    admin.baseApiUrl('http://jsonplaceholder.typicode.com/');

    const user = createUsersList(nga);
    const post = createPostsList(nga, user);

    admin.addEntity(user);
    admin.addEntity(post);
    nga.configure(admin);
}]);
