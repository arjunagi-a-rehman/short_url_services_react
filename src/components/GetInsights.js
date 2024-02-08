import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UrlCard({ url, onDetails, onUpdate, onDelete }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Short URL</h5>
          <p className="card-text">{url.shortUrl}</p>
          <h5 className="card-title">Long URL</h5>
          <p className="card-text">{url.origUrl}</p>
          <h5 className="card-title">Expiry Date</h5>
          <p className="card-text">{url.expiryDateTime}</p>
          <button className="btn btn-primary mr-2" onClick={() => onUpdate(url)}>Update</button>
          <button className="btn btn-danger mr-2" onClick={() => onDelete(url)}>Delete</button>
          <button className="btn btn-info" onClick={() => onDetails(url)}>Details</button>
        </div>
      </div>
    </div>
  );
}

function DetailsModal({ details, onClose }) {
  const renderRegionClickedOn = () => {
    const regionClickedOn = details.regionClickedOn;
    if (!regionClickedOn || regionClickedOn.length === 0) return null;

    return regionClickedOn.map((region, index) => (
      <div key={index}>
        <p><strong>clickers From:</strong> {region.country},{region.city}</p>
      </div>
    ));
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Details</h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p><strong>Original URL:</strong> {details.origUrl}</p>
            <p><strong>Short URL:</strong> {details.shortUrl}</p>
            <p><strong>Clicks:</strong> {details.clicks}</p>
            {renderRegionClickedOn()}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpdateModal({ url, onUpdate, onClose }) {
  const [longUrl, setLongUrl] = useState(url.origUrl);
  const [expiryDateTime, setExpiryDateTime] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://sus9.in/${url.urlId}`, {
        longUrl,
        expiryDateTime
      },{ withCredentials: true });
      console.log('Update successful:', response.data);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Update failed:', error.response.data);
      // Display error message to the user
    }
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update URL</h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="longUrl">Long URL:</label>
              <input type="text" className="form-control" id="longUrl" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="expiryDateTime">Expiry Date:</label>
              <input type="datetime-local" className="form-control" id="expiryDateTime" value={expiryDateTime} onChange={(e) => setExpiryDateTime(e.target.value)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GetInsights() {
  const [urls, setUrls] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [details, setDetails] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://sus9.in/user', { withCredentials: true });
      setUrls(response.data.urls);
    } catch (error) {
      handleUnauthorizedError(error);
    }
  };

  const handleUnauthorizedError = (error) => {
    if (error.response && error.response.status === 401) {
      navigate('/login');
    } else {
      console.error('Error fetching data:', error);
    }
  };

  const handleDetails = (url) => {
    setSelectedUrl(url);
    setDetails({
      origUrl: url.origUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      regionClickedOn: url.regionClickedOn
    });
  };

  const handleCloseDetails = () => {
    setSelectedUrl(null);
    setDetails(null);
  };

  const handleUpdate = (url) => {
    setSelectedUrl(url);
    setShowUpdateModal(true);
  };
  const handleDelete = async (url) => {
    try {
      await axios.delete(`https://sus9.in/${url.urlId}`,{ withCredentials: true });
      // Remove the deleted URL from the state
      setUrls(urls.filter(u => u._id !== url._id));
    } catch (error) {
      console.error('Delete failed:', error.response.data);
      // Display error message to the user
    }
  };

  const handleCloseUpdateModal = () => {
    setSelectedUrl(null);
    setShowUpdateModal(false);
  };

  return (
    <section id="Insights">
      <div className="text-center container-fluid">
        <h2 className="mb-4">Insights</h2>
      </div>
      <div className="row">
        {urls.map((url) => (
          <UrlCard
            key={url._id}
            url={url}
            onDetails={handleDetails}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {details && (
        <DetailsModal
          details={details}
          onClose={handleCloseDetails}
        />
      )}
      {showUpdateModal && selectedUrl && (
        <UpdateModal
          url={selectedUrl}
          onUpdate={fetchData}
          onClose={handleCloseUpdateModal}
        />
      )}
      {(details || showUpdateModal) && <div className="modal-backdrop fade show"></div>}
    </section>
  );
}

export default GetInsights;