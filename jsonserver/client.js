const faker = require('faker');
const fs = require('fs');
const moment = require('moment');

const generateClients = ( number ) => {
    const clients = [];
    while (number >= 0) {
        clients.push({
            id:number,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.stateAbbr(),
            zipcode: faker.address.zipCode()
        });
        number--;
    }
    return clients;
};


const generateEscrow = ( number ) => {
    const escrow = [];
    while (number >= 0) {
        escrow.push({
            id: number,
            doa: faker.date.past().toISOString(),
            client: faker.name.findName(),
            totalBill: ["$",faker.finance.amount()],
            currentBalance: ["$",faker.finance.amount()],
            proposedOffer: ["$",faker.finance.amount()],
            amountInEscrow: ["$",faker.finance.amount()]
        });
        number--;
    }
    return escrow;
};

fs.writeFileSync(
    "./db.json",
    JSON.stringify({ clients: generateClients(20), escrow: generateEscrow(20) })
);
