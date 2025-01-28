import {PactV4, SpecificationVersion} from '@pact-foundation/pact';
import * as path from 'node:path';
import {describe, expect, it} from '@jest/globals';
import BookClient from './client/Client';
import {eachLike} from '@pact-foundation/pact/src/v3/matchers';

const provider = new PactV4({
    dir: path.resolve(process.cwd(), './pacts'),
    consumer: 'frontend',
    provider: 'backend',
    spec: SpecificationVersion.SPECIFICATION_VERSION_V4
});

describe('Validate book endpoint', () => {
    const bookBody = {title: 'Contract Testing', author: 'XYZ'}

    it('returns the book object given to the matcher', () => {
        const interaction = provider
            .addInteraction()
            .uponReceiving(
                'a get request for book endpoint'
            )
            .withRequest('GET', '/book')
            .willRespondWith(200, (builder) => {
                builder.jsonBody(eachLike(bookBody))
            })

        return interaction.executeTest((mockserver) => {
            const bookClient = new BookClient(mockserver.url)
            return bookClient.fetch()
                .then((res) => {
                    expect(res.data[0].title).toEqual('Contract Testing');
                    expect(res.data[0].author).toEqual('XYZ');
                });
        })
    });

    it('returns the book object given to the matcher', () => {
        const interaction = provider
            .addInteraction()
            .uponReceiving('a post request for book endpoint')
            .withRequest('POST', '/book', (builder) => {
                builder.jsonBody(bookBody)
            })
            .willRespondWith(200, (builder) => {
                builder.jsonBody(bookBody)
            })

        return interaction.executeTest((mockserver) => {
            const bookClient = new BookClient(mockserver.url)
            return bookClient.create(bookBody)
                .then((res) => {
                    expect(res.data.title).toEqual('Contract Testing');
                    expect(res.data.author).toEqual('XYZ');
                });
        });
    });
});