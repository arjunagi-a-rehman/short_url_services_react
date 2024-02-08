import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory

function GenerateShortURL() {
  const [formData, setFormData] = useState({
    longUrl: '',
    expiryDateTime: ''
  });

  const [generatedUrl, setGeneratedUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/', formData,{ withCredentials: true });
      setGeneratedUrl(response.data.url);
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if unauthorized
        navigate('/login');
      } else {
        setGeneratedUrl(null);
        setErrorMessage('Failed to generate short URL. Please try again.');
      }
    }
  };

  return (
    <section id="Generate" className="container-fluid text-dark Generate-short justify-content-center">
      <div className="text-center mb-4 mt-1">
        <h3>Generate Short URL</h3>
      </div>

      <div className="row d-flex align-items-center justify-content-center min-vh-90">
        <form className="col-sm-8">
          <div className="form-group row">
            <label htmlFor="longUrl" className="col-sm-3 col-form-label">Long URL*</label>
            <div className="col-sm-9">
              <input type="url" className="form-control" id="longUrl" value={formData.longUrl} onChange={handleChange} placeholder="Long URL" required />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="expiryDateTime" className="col-sm-3 col-form-label">Expiry date time</label>
            <div className="col-sm-9">
              <input type="datetime-local" className="form-control" id="expiryDateTime" value={formData.expiryDateTime} onChange={handleChange} placeholder="Expiry date time" />
            </div>
          </div>
          <div className="text-center">
            <button type="button" className="btn btn-primary m-1" onClick={handleSubmit}>Generate</button>
          </div>
          <div className="text-danger">{errorMessage}</div>
        </form>
      </div>

      {generatedUrl && (
        <div className="container mt-4">
          <h5>Generated Short URL:</h5>
          <p><strong>Original URL:</strong> {generatedUrl.origUrl}</p>
          <p><strong>Short URL:</strong> <a href={generatedUrl.shortUrl}>{generatedUrl.shortUrl}</a></p>
          <p><strong>Expiry Date Time:</strong> {generatedUrl.expiryDateTime}</p>
        </div>
      )}
    </section>
  );
}

export default GenerateShortURL;
