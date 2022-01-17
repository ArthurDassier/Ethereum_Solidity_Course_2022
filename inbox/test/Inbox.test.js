const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');


let accounts = 0;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a defaut message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
});


// ----------- SECTION 3 VIDEO 47 : TEST WITH MOCHA -----------

class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

let car = 0;

beforeEach(() => {
    car = new Car();
});

describe('Car Class', () => {
    it('can park or WHAT ?!', () => {
        assert.equal(car.park(), 'stopped');
    });

    it('can drive this time ?', () => {
        assert.equal(car.drive(), 'vroom');
    });
});