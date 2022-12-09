import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Card } from "../../components";
import { ICompany, ILocation } from "../../utils";
import {
  createPaymentIntent,
  fetchSimilarCompanies,
} from "../../utils/httpRequests";
import { useStore } from "../../store";
import styles from "./jobs-post.module.css";
import { validateForm } from "../../utils/postFormHelpers/validateForm";
import { CheckoutForm } from "../../components/postFormComponents/checkout-form";
import { NewLocationSection } from "../../components/postFormComponents/new-location-section";
import { Input } from "../../components/input";

export default function PostAJob() {
  // const stripePromise = loadStripe(
  //   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  // );

  const previewJob = useStore((state) => state.previewJob);
  const setPreviewJob = useStore((state) => state.setPreviewJob);

  const stripeState = useStore((state) => state.stripeState);
  const setStripeState = useStore((state) => state.setStripeState);

  const showPaymentForm = useStore((state) => state.showPaymentForm);
  const setShowPaymentForm = useStore((state) => state.setShowPaymentForm);

  const companyLocationOptions = useStore(
    (state) => state.companyLocationOptions
  );
  const setCompanyLocationOptions = useStore(
    (state) => state.setCompanyLocationOptions
  );

  const [showSimilarCompanies, setShowSimilarCompanies] = useState(false);
  const [similarCompanies, setSimilarCompanies] = useState([]);
  const [similarCompanySelected, setSimilarCompanySelected] = useState(false);
  const [selectedSimilarCompany, setSelectedSimilarCompany] = useState<
    ICompany | undefined
  >(undefined);
  const [similarCompanyIncorrect, setSimilarCompanyIncorrect] = useState(false);
  const [disableLinkedFields, setDisableLinkedFields] = useState(false);
  const [displayCompensationInfo, setDisplayCompensationInfo] = useState(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const runOnPageLoad = async () => {
      // Create PaymentIntent as soon as the page loads
      const paymentIntent = await createPaymentIntent();
      setStripeState({
        ...stripeState,
        clientSecret: paymentIntent.clientSecret,
      });
    };

    try {
      runOnPageLoad();
    } catch (err) {
      console.error(err);
    }
  }, []);

  // used for testing only
  useEffect(() => {
    console.log("locations ue", previewJob.locations);
  }, [previewJob.locations]);

  useEffect(() => {
    const isFormValid = validateForm(previewJob, displayCompensationInfo);

    setFormValid(isFormValid);
  }, [previewJob, displayCompensationInfo]);

  function handleInputChange(e) {
    console.log(e);
    setPreviewJob({ ...previewJob, [e.target.name]: e.target.value });
  }

  async function handleCompanyNameBlur(e) {
    if (e.target.value) {
      const response = await fetchSimilarCompanies(e.target.value);

      setSimilarCompanies(response);
      setShowSimilarCompanies(true);
    }
  }

  function handleSimilarCompanyButtonClick(sc: ICompany) {
    setPreviewJob({
      ...previewJob,
      companyName: sc.name,
      companyMission: sc.mission,
      companyLogo: sc.logo,
      companyOverview: sc.overview,
      companyUsername: sc.username,
      // locations: sc.locations,
    });
    setCompanyLocationOptions(sc.locations);

    setShowSimilarCompanies(false);
    setSimilarCompanySelected(true);
    setSelectedSimilarCompany(sc);
    setDisableLinkedFields(true);
  }

  function handleNoSimilarCompaniesButtonClick() {
    setShowSimilarCompanies(false);
    setSimilarCompanyIncorrect(true);
  }

  function handleUndoLinkingSimilarCompanyButtonClick() {
    setDisableLinkedFields(false);
    setSimilarCompanySelected(false);
    setSelectedSimilarCompany(undefined);
    setShowSimilarCompanies(true);
  }

  function handleUndoNoSimilarCompanyButtonClick() {
    setShowSimilarCompanies(true);
    setSimilarCompanyIncorrect(false);
  }

  function handleCompensationDisplay() {
    // if (!displayCompensationInfo) {
    setPreviewJob({
      ...previewJob,
      payRangeMin: undefined,
      payRangeMax: undefined,
      equityRangeMin: undefined,
      equityRangeMax: undefined,
      payRangeTimeFrame: "",
    });
    // }

    setDisplayCompensationInfo(!displayCompensationInfo);
  }

  function handleJobPostingFormSubmit() {
    setShowPaymentForm(true);
    setPreviewJob(previewJob);
  }

  function similarCompaniesFn() {
    // similar companies exist after fetch
    if (similarCompanies.length && showSimilarCompanies) {
      return (
        <div>
          <p>We found these companies with similar names:</p>
          <div className={styles.similarCompanyContainer}>
            {similarCompanies &&
              similarCompanies.map((sc) => (
                <Card key={sc.id} className={styles.similarCompany}>
                  <div>
                    <p>{sc.name}</p>
                    <p>@{sc.username}</p>
                  </div>
                  <Button onClick={() => handleSimilarCompanyButtonClick(sc)}>
                    Link
                  </Button>
                </Card>
              ))}
          </div>
          <Button onClick={handleNoSimilarCompaniesButtonClick}>
            Do Not Link
          </Button>
        </div>
      );
    }
    // user links similar company
    if (similarCompanySelected) {
      return (
        <div>
          <p>
            We have linked your posting to @{selectedSimilarCompany.username}
          </p>
          <Button onClick={handleUndoLinkingSimilarCompanyButtonClick}>
            Undo
          </Button>
        </div>
      );
    }

    // no similar companies after fetch or user declines similar companies
    if (
      (!similarCompanies.length && showSimilarCompanies) ||
      similarCompanyIncorrect
    ) {
      return (
        <div>
          <p>{previewJob.companyName} will be added as a new company</p>
          <Button onClick={handleUndoNoSimilarCompanyButtonClick}>Undo</Button>
          <div>
            <label htmlFor="companyUsername">Company Username</label>
            <Card>
              <input
                type="text"
                name="companyUsername"
                placeholder={`Add a username for ${previewJob.companyName}`}
                value={previewJob.companyUsername}
                required
                onChange={handleInputChange}
              />
            </Card>
          </div>
        </div>
      );
    }

    // init - not fetched
    return;
  }

  function handleExistingCompanyLocationClick(l: ILocation) {
    const locations = previewJob.locations;
    console.log("locations 1", locations);

    if (!previewJob.locations.some((el) => el.id === l.id)) {
      console.log("hit");
      locations.push(l);
      console.log("locations 2", locations);
      setPreviewJob({ ...previewJob, locations: locations });
    } else {
      // else button says selected
      setPreviewJob({
        ...previewJob,
        locations: previewJob.locations.filter(
          (location) => location.id !== l.id
        ),
      });
    }
  }

  return (
    <div>
      <Head>
        <title>Post a Job - Cloud Computing Jobs</title>
        <meta name="description" content="Add a software engineering job" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.jobPostingFormContainer}>
        {!showPaymentForm ? (
          <form className={styles.form}>
            <Card>
              <h2>Add a Job</h2>
              <p>
                Add information about the job by going through the form below.
                When you are done, click the Continue to Preview & Payment
                button to preview your posting and pay.
              </p>
            </Card>

            <Card>
              <Input
                type="text"
                name="companyName"
                label="Company Name"
                value={previewJob.companyName}
                onChange={handleInputChange}
                onBlur={handleCompanyNameBlur}
                disabled={disableLinkedFields}
                required={true}
              />

              {similarCompaniesFn()}

              <Input
                type={"text"}
                name={"title"}
                label={"Job Title"}
                value={previewJob.title}
                onChange={handleInputChange}
                required={true}
              />

              <div>
                <label htmlFor="type">Job Type</label>
                <Card>
                  <select
                    id="type"
                    name="type"
                    value={previewJob.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Select Job Type" disabled>
                      Select Job Type
                    </option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                </Card>
              </div>

              <div>
                <label htmlFor="experience">Experience Level</label>
                <Card>
                  <select
                    id="experience"
                    name="experience"
                    value={previewJob.experience}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Select Experience Level" disabled>
                      Select Experience Level
                    </option>
                    <option value="Senior">Senior</option>
                    <option value="Senior">Entry</option>
                  </select>
                </Card>
              </div>

              <Input
                type={"text"}
                name={"companyMission"}
                label={"Company Mission"}
                value={previewJob.companyMission}
                onChange={handleInputChange}
                required={true}
                disabled={disableLinkedFields}
              />
              <Input
                type={"text"}
                name={"companyLogo"}
                label={"Company Logo"}
                value={previewJob.companyLogo}
                onChange={handleInputChange}
                required={true}
              />

              <div>
                <label htmlFor="companyOverview">Company Overview</label>
                <Card>
                  <textarea
                    name="companyOverview"
                    rows={4}
                    placeholder="Company Overview"
                    value={previewJob.companyOverview}
                    onChange={handleInputChange}
                    disabled={disableLinkedFields}
                    required
                  />
                </Card>
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <Card>
                  <textarea
                    name="description"
                    rows={4}
                    placeholder="Position Description"
                    value={previewJob.description}
                    onChange={handleInputChange}
                    required
                  />
                </Card>
              </div>

              <div>
                <label htmlFor="qualifications">Qualifications</label>
                <Card>
                  <textarea
                    name="qualifications"
                    rows={4}
                    placeholder="Qualifications"
                    value={previewJob.qualifications}
                    onChange={handleInputChange}
                    required
                  />
                </Card>
              </div>

              <div>
                <label htmlFor="qualifications">Responsibilities</label>
                <Card>
                  <textarea
                    name="responsibilities"
                    rows={4}
                    placeholder="Responsibilities"
                    value={previewJob.responsibilities}
                    onChange={handleInputChange}
                    required
                  />
                </Card>
              </div>

              <h3>Compensation</h3>
              <div>
                <input
                  type="checkbox"
                  name="salary"
                  onChange={handleCompensationDisplay}
                />
                <label htmlFor="salary">Display Compensation Info</label>
              </div>

              {displayCompensationInfo && (
                <div>
                  <h3>Pay Range</h3>
                  <Input
                    type={"text"}
                    name={"payRangeMin"}
                    label={"Minimum"}
                    value={previewJob.payRangeMin}
                    onChange={handleInputChange}
                  />
                  <Input
                    type={"text"}
                    name={"payRangeMax"}
                    label={"Maximum"}
                    value={previewJob.payRangeMax}
                    onChange={handleInputChange}
                  />

                  <h3>Equity Range</h3>
                  <Input
                    type={"text"}
                    name={"equityRangeMin"}
                    label={"Minimum"}
                    value={previewJob.equityRangeMin}
                    onChange={handleInputChange}
                  />
                  <Input
                    type={"text"}
                    name={"equityRangeMax"}
                    label={"Maximum"}
                    value={previewJob.equityRangeMax}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <Input
                type={"text"}
                name={"posting"}
                label={"Posting Link"}
                value={previewJob.posting}
                onChange={handleInputChange}
                required={true}
              />
            </Card>

            <div>
              <p>Locations</p>
              {similarCompanySelected && (
                <h3>Other locations for {previewJob.companyName}</h3>
              )}
              {companyLocationOptions.length &&
                companyLocationOptions.map((l: ILocation) => (
                  <Card key={l.id}>
                    <h2>{l.locality}</h2>
                    <p>
                      {l.thoroughfare}, {l.locality}, {l.administrativeArea}
                    </p>
                    <Button
                      className="active"
                      onClick={() => handleExistingCompanyLocationClick(l)}
                    >
                      {previewJob.locations.length &&
                      previewJob.locations.some((el) => el.id === l.id)
                        ? "Selected"
                        : "Select"}
                    </Button>
                  </Card>
                ))}
            </div>

            <NewLocationSection />

            <Button
              type="submit"
              onClick={handleJobPostingFormSubmit}
              disabled={!formValid}
            >
              Continue to Preview & Payment
            </Button>
          </form>
        ) : (
          <CheckoutForm />
        )}

        <Card className={styles.sidebar}>
          <p>sidebar</p>
        </Card>
      </div>
    </div>
  );
}
