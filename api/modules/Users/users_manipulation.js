const { readFile: p, writeFile: w } = require('node:fs/promises');

const readjson = async () => {
  const read = await p('../app/users.json', { encoding: 'utf8' });
  const parse = JSON.parse(read);
  return parse.users;
};

const writejson = async (req, updated_data_key) => {
  const data = await readjson();
  data.push(req);
  const updated_data = {
    [updated_data_key]: data,
  };
  await w('../app/users.json', JSON.stringify(updated_data));
  return true;
};

const update_json = async (req, index, updated_data_key) => {
  const data = await readjson();
  data[index] = req;
  const update_data = {
    [updated_data_key]: data,
  };
  await w('../app/users.json', JSON.stringify(update_data));
  return true;
};

const delete_json = async (index, updated_data_key) => {
  const data = await readjson();
  data.splice(index, 1);
  const updated_data = {
    [updated_data_key]: data,
  };
  await w('../app/users.json', JSON.stringify(updated_data));
  return true;
};

module.exports = { readjson, writejson, update_json, delete_json };
