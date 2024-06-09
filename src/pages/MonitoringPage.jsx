import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MonitoringPage.css';

const data = {
  locations: [
    { id: 1, name: 'Institut Teknologi Bandung' },
    { id: 2, name: 'Masjid Salman' }
  ],
  parking_areas: [
    {
      id: 1,
      name: 'GKUB',
      location_id: 1,
      slots: new Array(20).fill().map((_, i) => ({
        id: i + 1,
        status: i % 2 === 0 ? 'available' : 'occupied'
      }))
    },
    {
      id: 2,
      name: 'Labtek V',
      location_id: 1,
      slots: new Array(20).fill().map((_, i) => ({
        id: i + 1,
        status: i % 2 === 0 ? 'available' : 'occupied'
      }))
    },
    {
      id: 3,
      name: 'Utara',
      location_id: 2,
      slots: new Array(20).fill().map((_, i) => ({
        id: i + 1,
        status: i % 2 === 0 ? 'available' : 'occupied'
      }))
    },
    {
      id: 4,
      name: 'Selatan',
      location_id: 2,
      slots: new Array(20).fill().map((_, i) => ({
        id: i + 1,
        status: i % 2 === 0 ? 'available' : 'occupied'
      }))
    }
  ]
};

function MonitoringPage() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(data.locations[0].id);
  const [selectedParkingArea, setSelectedParkingArea] = useState(data.parking_areas[0].id);

  const getSlotsFromStorage = (areaId) => {
    const savedSlots = localStorage.getItem(`slots-${areaId}`);
    return savedSlots ? JSON.parse(savedSlots) : data.parking_areas.find(area => area.id === areaId).slots;
  };

  const [slots, setSlots] = useState(() => getSlotsFromStorage(selectedParkingArea));

  useEffect(() => {
    localStorage.setItem(`slots-${selectedParkingArea}`, JSON.stringify(slots));
  }, [slots, selectedParkingArea]);

  const handleLocationChange = (locationId) => {
    setSelectedLocation(locationId);
    const newParkingArea = data.parking_areas.find(area => area.location_id === locationId);
    setSelectedParkingArea(newParkingArea.id);
    setSlots(getSlotsFromStorage(newParkingArea.id));
  };

  const handleParkingAreaChange = (areaId) => {
    setSelectedParkingArea(areaId);
    setSlots(getSlotsFromStorage(areaId));
  };

  const goToEditStatus = () => {
    navigate('/edit-status');
  };

  const selectedParkingAreaName = data.parking_areas.find(area => area.id === selectedParkingArea).name;
  const selectedLocationName = data.locations.find(location => location.id === selectedLocation).name;

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  return (
    <div className="monitoring-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/logospasi.png" alt="Logo SPASI" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><a href="/edit-status"><i className="fas fa-pencil-alt"></i> Edit Status</a></li>
            <li><a href="/monitoring" className="active"><i className="fas fa-binoculars"></i> Pemantauan</a></li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <a href="/login">Keluar</a>
        </div>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <h1>Pemantauan</h1>
          <div className="user-info">
            <span>{loggedInUser ? loggedInUser.fullName : 'Guest'}</span>
          </div>
        </header>
        <section className="monitoring-section">
          <div className="location-parking-container">
            <div className="location-selection">
              <h3>Lokasi</h3>
              <table className="rounded-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Lokasi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.locations.map(location => (
                    <tr key={location.id} className={selectedLocation === location.id ? 'selected-row' : ''}>
                      <td>{location.id}</td>
                      <td>{location.name}</td>
                      <td>
                        <button
                          className={`select-button ${selectedLocation === location.id ? 'active' : ''}`}
                          onClick={() => handleLocationChange(location.id)}
                        >
                          {selectedLocation === location.id ? 'Dipilih' : 'Pilih'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="parking-area-selection">
              <h3>Area Parkir</h3>
              <table className="rounded-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Area Parkir</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.parking_areas.filter(area => area.location_id === selectedLocation).map(area => (
                    <tr key={area.id} className={selectedParkingArea === area.id ? 'selected-row' : ''}>
                      <td>{area.id}</td>
                      <td>{area.name}</td>
                      <td>
                        <button
                          className={`select-button ${selectedParkingArea === area.id ? 'active' : ''}`}
                          onClick={() => handleParkingAreaChange(area.id)}
                        >
                          {selectedParkingArea === area.id ? 'Dipilih' : 'Pilih'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <h3>Denah Area Parkir</h3>
          <p>Jumlah slot parkir: {slots.filter(slot => slot.status === 'available').length}/20 slot parkir tersedia</p>
          <p>Jumlah pengguna menuju: 4 pengguna</p>
          <div className="parking-status-container">
            <h3>Area Parkir - {selectedParkingAreaName} ({selectedLocationName})</h3>
            <div className="parking-content">
              <div className="parking-map">
                <div className="parking-row">
                  {slots.slice(0, 10).map(slot => (
                    <div
                      key={slot.id}
                      className={`parking-slot ${slot.status}`}
                    ></div>
                  ))}
                </div>
                <div className="parking-row">
                  {slots.slice(10).map(slot => (
                    <div
                      key={slot.id}
                      className={`parking-slot ${slot.status}`}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="legend">
                <div className="compass">
                  <img src="/compass.png" alt="Compass" />
                </div>
                <div><div className="available-slot"></div> Tersedia</div>
                <div><div className="occupied-slot"></div> Terisi</div>
              </div>
            </div>
            <button className="edit-status-button" onClick={goToEditStatus}>Edit Status Slot Parkir</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MonitoringPage;
