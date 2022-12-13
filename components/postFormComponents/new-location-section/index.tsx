import { useState } from "react";
import { Button, Input } from "../../../components";
import { useStore } from "../../../store";
import styles from "./new-location-section.module.css";

export function NewLocationSection() {
  const previewJob = useStore((state) => state.previewJob);
  const setPreviewJob = useStore((state) => state.setPreviewJob);

  const companyLocationOptions = useStore(
    (state) => state.companyLocationOptions
  );
  const setCompanyLocationOptions = useStore(
    (state) => state.setCompanyLocationOptions
  );

  const initNewLocation = {
    id: 0,
    // companyId
    country: "US",
    administrativeArea: "",
    locality: "",
    thoroughfare: "",
    premise: "",
    postalCode: undefined,
    headquarters: false,
    latitude: 40.0, // TODO add helper to determine lat long from address
    longitude: -70.0,
  };

  const [newLocation, setNewLocation] = useState(initNewLocation);

  function handleNewLocationInputChange(e) {
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
    <div className={styles.newLocationSection}>
      <Button onClick={handleAddNewLocationButtonClick}>
        Add a new location
      </Button>
      {newLocationSectionActive && (
        <div>
          <Input
            type="text"
            name="thoroughfare"
            label="Street Address"
            value={newLocation.thoroughfare}
            onChange={handleNewLocationInputChange}
          />
          <Input
            type="text"
            name="locality"
            label="City"
            value={newLocation.locality}
            onChange={handleNewLocationInputChange}
          />
          <Input
            type="text"
            name="administrativeArea"
            label="State"
            value={newLocation.administrativeArea}
            onChange={handleNewLocationInputChange}
          />
          <Input
            type="text"
            name="postalCode"
            label="ZIP Code"
            value={newLocation.postalCode}
            onChange={handleNewLocationInputChange}
          />
          <Button onClick={handleNewLocationClick}>Add Location</Button>
        </div>
      )}
    </div>
  );
}
