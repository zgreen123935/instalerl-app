import Airtable from 'airtable';

const base = new Airtable({
  apiKey: 'patdO1RLKkgBMsvtJ.b293998bbfed44737014eb9922ce07f4aa212f22bfee73c30fe43f07e76f7f25'
}).base('appEL9Y26LvV46RbB');

try {
  const records = await base('MainTable').select({}).firstPage();
  console.log('Success! Found', records.length, 'records');
} catch (err) {
  console.error('Error:', err);
}
