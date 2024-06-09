import { MongoDatabase } from '../../../../src/data/mongodb';
const mongoose = require("mongoose");

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('mongoose');

describe('Mongo conection error', () => {
  const options = {
    mongoUrl: 'mongodb://user:1234@localhost:27017',
    dbName: 'user-xgroup-test'
  }

  it('should log an error and throw an error if mongoose.connect fails', async () => {
    const errorMessage = 'Connection failed';
    (mongoose.connect as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    console.log = jest.fn();

    await expect(MongoDatabase.connect(options)).rejects.toThrow(errorMessage);
    expect(console.log).toHaveBeenCalledWith('Mongo connection error');
  });

});