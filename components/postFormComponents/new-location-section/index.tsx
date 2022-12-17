import { useState } from "react";
import { Button, Input } from "../../../components";
import { useStore } from "../../../store";
import { ILocation } from "../../../types";
import styles from "./new-location-section.module.css";

export function NewLocationSection() {
  const [
    companyLocationOptions,
    previewJob,
    setCompanyLocationOptions,
    setPreviewJob,
  ] = useStore((state) => [
    state.companyLocationOptions,
    state.previewJob,
    state.setCompanyLocationOptions,
    state.setPreviewJob,
  ]);

  const initNewLocation = {
    id: 0,
    companyId: 0,
    country: "US",
    administrativeArea: "",
    locality: "",
    thoroughfare: "",
    premise: "",
    postalCode: undefined,
    headquarters: false,
    latitude: null,
    longitude: null,
  };

  const [newLocation, setNewLocation] = useState<ILocation>(initNewLocation);
  const [newLocationSectionActive, setNewLocationSectionActive] =
    useState<boolean>(false);

  function handleInputChange(e) {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  }

  function handleAddNewLocationClick() {
    // take newLocation state item, add to previewJob as location,
    setPreviewJob({
      ...previewJob,
      locations: previewJob.locations.concat(newLocation),
    });
    setCompanyLocationOptions(companyLocationOptions.concat(newLocation));
    // clear state for newLocation
    setNewLocation(initNewLocation);
    setNewLocationSectionActive(false);
  }

  function handleOpenSectionClick() {
    if (!newLocationSectionActive) {
      setNewLocationSectionActive(true);
    }
  }

  return (
    <div className={styles.newLocationSection}>
      {!newLocationSectionActive ? (
        <Button onClick={handleOpenSectionClick}>Add a New Location</Button>
      ) : (
        <div>
          <Input
            bordered
            type="text"
            name="thoroughfare"
            label="Street Address"
            value={newLocation.thoroughfare}
            onChange={handleInputChange}
          />
          <Input
            bordered
            type="text"
            name="locality"
            label="City"
            value={newLocation.locality}
            onChange={handleInputChange}
          />
          <Input
            bordered
            type="text"
            name="administrativeArea"
            label="State"
            value={newLocation.administrativeArea}
            onChange={handleInputChange}
          />
          <Input
            bordered
            type="text"
            name="postalCode"
            label="ZIP Code"
            value={newLocation.postalCode}
            onChange={handleInputChange}
          />
          <Button onClick={handleAddNewLocationClick}>Add Location</Button>
        </div>
      )}
    </div>
  );
}
