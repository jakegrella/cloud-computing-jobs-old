import { useEffect, useState } from "react";
import { useStore } from "../../../store";
import { Button } from "../../button";
import { Card } from "../../card";

export function NewLocationSection() {
  const previewJob = useStore((state) => state.previewJob);
  const setPreviewJob = useStore((state) => state.setPreviewJob);

  const companyLocationOptions = useStore(
    (state) => state.companyLocationOptions
  );
  const setCompanyLocationOptions = useStore(
    (state) => state.setCompanyLocationOptions
  );

  useEffect(() => {
    console.log("locations", previewJob.locations);
  }, [previewJob.locations]);

  const initNewLocation = {
    country: "",
    administrativeArea: "",
    locality: "",
    thoroughfare: "",
    premise: "",
    postalCode: undefined,
    headquarters: false,
    latitude: undefined,
    longitude: undefined,
  };

  const [newLocation, setNewLocation] = useState(initNewLocation);

  function handleNewLocationInputChange(e) {
    console.log(e);
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  }

  function handleNewLocationClick() {
    const previewJobLocations = previewJob.locations;
    previewJobLocations.push(newLocation);
    const x = companyLocationOptions;
    x.push(newLocation);

    // take newLocation state item, add to previewJob as location,
    setPreviewJob({ ...previewJob, locations: previewJobLocations });
    setCompanyLocationOptions(x);
    // clear state for newLocation
    setNewLocation(initNewLocation);
    setNewLocationSectionActive(false);
  }

  const [newLocationSectionActive, setNewLocationSectionActive] =
    useState(false);

  function handleAddNewLocationButtonClick() {
    if (!newLocationSectionActive) {
      setNewLocationSectionActive(true);
    }
  }

  return (
    <div>
      <Button onClick={handleAddNewLocationButtonClick}>
        Add a new location
      </Button>
      {newLocationSectionActive && (
        <Card>
          <div>
            <label htmlFor="thoroughfare">Street Address</label>
            <Card>
              <input
                type="text"
                name="thoroughfare"
                placeholder="Street Address"
                value={newLocation.thoroughfare}
                onChange={handleNewLocationInputChange}
              />
            </Card>
          </div>
          <div>
            <label htmlFor="locality">City</label>
            <Card>
              <input
                type="text"
                name="locality"
                placeholder="City"
                value={newLocation.locality}
                onChange={handleNewLocationInputChange}
              />
            </Card>
          </div>
          <div>
            <label htmlFor="administrativeArea">State</label>
            <Card>
              <input
                type="text"
                name="administrativeArea"
                placeholder="State"
                value={newLocation.administrativeArea}
                onChange={handleNewLocationInputChange}
              />
            </Card>
          </div>
          <div>
            <label htmlFor="postalCode">ZIP Code</label>
            <Card>
              <input
                type="text"
                name="postalCode"
                placeholder="ZIP Code"
                value={newLocation.postalCode}
                onChange={handleNewLocationInputChange}
              />
            </Card>
          </div>
          <Button onClick={handleNewLocationClick}>Add Location</Button>
        </Card>
      )}
    </div>
  );
}
