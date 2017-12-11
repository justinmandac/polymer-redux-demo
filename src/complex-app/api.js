(() => {
  const url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';

  window.EarthquakeApp = window.EarthquakeApp || {};
  window.EarthquakeApp.api = (lat, long, startDate, endDate, radius) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      `${url}&latitude=${lat}&longitude=${long}&starttime=${
        startDate}&endtime=${endDate}&maxradiuskm=${radius}`,
    );
    return new Promise((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(xhr.response);
        }
      };

      xhr.onerror = () => {
        reject();
      };

      xhr.send();
    });
  };
})();
