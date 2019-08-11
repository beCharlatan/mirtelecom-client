class MirtelecomService {

  // dev
  _apiBase = 'http://localhost/api'
  _authBase = 'http://localhost/auth'
  // _apiBase = 'http://192.168.1.18/api'
  // _authBase = 'http://192.168.1.18/auth'
  // prod
  // _apiBase = 'http://172.16.13.250/mirtelecom2server/public/index.php/api'
  // _authBase = 'http://172.16.13.250/mirtelecom2server/public/index.php/auth'

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json()
  };

  getSignIn = async (obj) => {
    try {
      const authed = await fetch(`${this._authBase}/signin`, {
        method: 'POST',
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(obj)
      })
    return await authed.json()
    } catch (error) {
      console.log(error)
    }
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

  getLocateEquipment = async (obj) => {
    const geojson = {
      lat: obj.coords.lat,
      lng: obj.coords.lng
    }
    const locatedEquipment = await fetch(`${this._apiBase}/equipment/locate/${obj.id}`, {
      method: 'PUT',
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(geojson)
    })
    return await locatedEquipment.json()
  }

  getGeocodeEquipment = async (obj) => {
    const geocodeRes = await fetch(`${this._apiBase}/geocode`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(obj)
    })
    if (!geocodeRes.ok) {
      throw new Error(`Could not fetch` +
        `, received ${geocodeRes.status}`)
    }
    const coords = await geocodeRes.json()
    return await this.getLocateEquipment({coords: coords, id: obj.id})
  }

  getUpdatedEquipment = async (obj) => {
    const updatedEquipment = await fetch(`${this._apiBase}/equipment/update/${obj.id}`, {
      method: 'PUT',
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
  }
}

export const mirtelecomService = new MirtelecomService()