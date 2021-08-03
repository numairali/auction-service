'use strict';

import {v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';

module.exports.hello = async (event) => {


    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {title} = JSON.parse(event.body);
    const now = new Date();

    const auction = {
        id: uuid(),
        title,
        status: 'OPEN',
        createdAt: now.toISOString()
    };

    await dynamodb.put({
        TableName: 'AuctionsTable',
        Item: auction
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(auction, null, 2),
    };

};
