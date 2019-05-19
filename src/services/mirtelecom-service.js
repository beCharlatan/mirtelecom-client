export default class MirtelecomService {

  // dev
  //_apiBase = 'http://localhost/api'
  //_authBase = 'http://localhost/auth'
  _apiBase = 'http://192.168.1.18/api'
  _authBase = 'http://192.168.1.18/auth'
  // prod
  //_apiBase = 'http://172.16.13.250:8081/api'
  //_authBase = 'http://172.16.13.250:8081/auth'

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json()
  };

  getSignIn = async (obj) => {
    const authed = await fetch(`${this._authBase}/signin`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(obj)
    })
    console.log(authed)
    return await authed.json()
  }

  getEquipment = async () => {
    return await this.getResource(`/equipments`)
  };

  getOneEquipment = async (id) => {
    return await this.getResource(`/equipment/${id}`)
  };

  getCreatedEquipment = async (obj) => {
    const createdEquipment = await fetch(`${this._apiBase}/equipment/create`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(obj)
    })
    return await createdEquipment.json()
  }

  getRemovedEquipment = async (id) => {
    const removedEquipment = await fetch(`${this._apiBase}/equipment/remove/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    return await removedEquipment.json()
  }

  getUpdatedEquipment = async (obj) => {
    const updatedEquipment = await fetch(`${this._apiBase}/equipment/update/${obj.gid}`, {
      method: 'PUT',
      mode: 'cors',
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(obj)
    })
    return await updatedEquipment.json()
  }

  getFeature = async table => {
    return await this.getResource(`/features/${table}`)
  }

  getEquipmentFeature = async () => {
    return await this.getResource(`/features/equipment`)
  };

  // getUnique = {
  //   addresses: getUnique(this.data, 'address'),
  //   equipments: getUnique(this.data, 'equipment'),
  //   statuses: getUnique(this.data, 'status')
  // };
};