'use strict';

const config = require('./settings');
const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(config.neo4j.user, config.neo4j.password));

exports.getKudos = (request, response) => {
    const kudosId = Number(request.params.id);
    var session = driver.session()
    session.run('MATCH (k:Kudos) WHERE id(k)='+kudosId+' \
                 MATCH (k)<-[:SENDS]-(u1:User) \
                 MATCH (k)-[:DELIVERED_TO]->(u2:User) \
                 RETURN ID(k) AS id, u1.name AS from, u2.name AS to, k.name AS title')
    .then(result => {
        console.log(result.records);
        var kudos = [];

        result.records.forEach(record => {
            kudos.push({
                id: record.get('id').low,
                from: record.get('from'),
                to: record.get('to'),
                title: record.get('title')
            });
        })

        response.json(kudos[0]);
    })
    .catch(error => {
        console.log(error)
    })
    .then(() => session.close());
};

exports.deleteKudos = (request, response) => {
    const kudosId = Number(request.params.id);
    var session = driver.session()
    session.run('MATCH (k:Kudos) WHERE id(k)='+kudosId+' \
                 DELETE k')

    .then(result => {
        response.json({"kudos_deleted": "true"});
    })
    .catch(error => {
        console.log(error)
    })
    .then(() => session.close());
};