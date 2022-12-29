import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OnBoarding = () => {
  const [cookies] = useCookies(null);
  const [checkedValues, setCheckedValues] = useState([]);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    gaming_interest: checkedValues,
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    url: "",
    about: "",
    matches: [],
  });

  const genreOptions = [
    { value: "Sandbox", label: "Sandbox" },
    { value: "RTS", label: "Real-time Strategy" },
    { value: "Shooter", label: "Shooter Games" },
  ];

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:8000/user", {
        formData,
      });
      console.log(response);
      const success = response.status === 200;
      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  // Handle changes to the checkbox group
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let updatedCheckedValues;

    if (name === "gaming_interest") {
      // If the checkbox is checked, add its value to the state array.
      // Otherwise, remove the value from the array.
      if (e.target.checked) {
        updatedCheckedValues = [...checkedValues, value];
      } else {
        updatedCheckedValues = checkedValues.filter((val) => val !== value);
      }

      setCheckedValues(updatedCheckedValues);

      // Update the form data with the new gaming_interest values
      setFormData((prevState) => ({
        ...prevState,
        gaming_interest: updatedCheckedValues,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  console.log(formData);

  return (
    <>
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />

            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />

              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />

              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === "man"}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === "woman"}
              />
              <label htmlFor="woman-gender-identity">Woman</label>
              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === "more"}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>

            {/* GAMING INTEREST PART */}
            <> </>
            <label>Your gaming Genre Interests (Check all that apply) :</label>
            <> </>

            {genreOptions.map((option) => (
              <label key={option.value}>
                <input
                  name="gaming_interest"
                  type="checkbox"
                  value={option.value}
                  checked={checkedValues.includes(option.value)}
                  onChange={handleChange}
                />
                {option.label}
              </label>
            ))}

            {/* SHOW GENDER PREF */}
            <div>
              <label>Would you like everyone to see your gender?</label>

              <div className="multiple-input-container">
                <input
                  id="yes-show_gender"
                  type="radio"
                  name="show_gender"
                  value={true}
                  onChange={(e) => handleChange(e)}
                />

                <label htmlFor="yes-show_gender">YES</label>

                <input
                  id="no-show_gender"
                  type="radio"
                  name="show_gender"
                  value={false}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="no-show_gender">NO</label>
              </div>
            </div>

            {/* SEXUAL INTEREST */}

            <label>Sexual Preference/Interest</label>

            <div className="multiple-input-container">
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                value="man"
                onChange={handleChange}
                checked={formData.gender_interest === "man"}
              />
              <label htmlFor="man-gender-interest">Man</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_interest === "woman"}
              />
              <label htmlFor="woman-gender-interest">Woman</label>
              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender_interest"
                value="everyone"
                onChange={handleChange}
                checked={formData.gender_interest === "everyone"}
              />
              <label htmlFor="everyone-gender-interest">Everyone</label>
            </div>

            <label htmlFor="about">About me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            />

            <input type="submit" />
          </section>

          <section>
            <label htmlFor="url">Profile Photo</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="profile pic preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};
export default OnBoarding;
