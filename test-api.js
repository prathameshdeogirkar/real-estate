const http = require('http');

const makeRequest = (method, path, data, token = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(body)
          });
        } catch {
          resolve({
            status: res.statusCode,
            data: body
          });
        }
      });
    });
    
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
};

const testAPI = async () => {
  try {
    console.log('🔵 Testing Admin Login...');
    const loginRes = await makeRequest('POST', '/api/admin/login', {
      username: 'admin',
      password: 'admin123'
    });
    
    if (loginRes.status !== 200) {
      console.error('❌ Login failed:', loginRes.data);
      return;
    }
    
    console.log('✅ Login Successful!');
    console.log('Token:', loginRes.data.token);
    
    const token = loginRes.data.token;
    
    console.log('\n🔵 Testing Add Property...');
    const propertyRes = await makeRequest('POST', '/api/properties/add', {
      title: 'Test Property',
      type: 'Flat',
      address: 'Test Address',
      description: 'Test Description',
      price: 500000,
      property_type: 'For Sale',
      image: 'https://via.placeholder.com/300',
      images: [],
      area: 1200,
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      amenities: [],
      nearby_places: [],
      map_location: ''
    }, token);
    
    console.log('Status:', propertyRes.status);
    console.log('Response:', JSON.stringify(propertyRes.data, null, 2));
    
    if (propertyRes.status !== 201) {
      console.error('❌ Property add failed!');
    } else {
      console.log('✅ Property Added Successfully!');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
};

testAPI();
