import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { Redirect, Route, RouteComponentProps } from "react-router";
import Column from "../components/Column";
import Container from "../components/Container";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";
import StorageService from "../services/StorageService";
import UserService from "../services/UserService";
import ProfileUpload from "../components/ProfileUpload";
import "../index"
import IconButton from '@material-ui/core/IconButton';


type Props = {uploadClick: () => void } & RouteComponentProps;
type State = {
  profileData: any;
  address: any;
  delAddress: any;
  userProfileImage: string;
  profileImage: any;
  // hide: boolean;
};
class Profile extends React.Component<Props, State> {
  state: State = { profileData: [], address: [], delAddress: [], userProfileImage: "", profileImage: "", };

  async componentDidMount() {
    try {
      const { data } = await UserService.profile();
      this.setState({
        profileData: data,
        address: data.address,
      });
    } catch (e) {
      console.log(e);
    }
  }
  async getData() {
    const { data } = await UserService.profile();
    this.setState({
      // hide: true,
    });
    this.setState({
      address: data.address,
      userProfileImage: data.profileImage,
    });

    axios
    .get(
      `http://localhost:5000/auth/profileImage/${this.state.userProfileImage}`
    )
    .then(
      (response) => (
        console.log(response.status === 200, "getting"),
        // history.state("/login")
        console.log(response),
        this.setState({
          profileImage: response.request.responseURL,
        }),
        console.log(this.state.profileImage)
      )
    );

  }
  render() {
    console.log(this.state.address);
    console.log(this.state.profileData);
    const delAddress = (e: any) => {
      let delAddressId = e.target.value;

      return StorageService.getData("token").then((token) =>
        axios
          .delete(` http://localhost:5000/address/${delAddressId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            this.getData();
            console.log("data deleted");
          })
          .catch((err) => console.log(err))
      );
    };

    // iconClicked = () => {
    //   this.setState({
    //     hide: false,
    //   });
    // };

    return (
      <Container>
        <Row>
          <Column size={8} classes={"offset-md-2 fw-bold bg-light fs-3"}>
            <div className="header text-center border shadow-md">
              User Details
            </div>
            <div className="profileImage" id="profileImage">
                <IconButton>
                <img
                  src={this.state.profileImage}
                  alt="Profile Image"
                  className="img-thumbnail"
                  width="200px"
                />
                </IconButton>

                <i
                  className="fas fa-upload text-dark"
                  // onClick={this.iconClicked}
                ></i>
                {/* {this.state.hide ? null : (
                  <ProfileUpload getData={this.getData} />
                )} */}
              </div>
            <div className="flex ">
              <div className="imgfallback ">
                <ImageWithFallback
                  source="https://www.kindpng.com/picc/m/78-785975_icon-profile-bio-avatar-person-symbol-chat-icon.png"
                  classes="card-img-top img-responsive "
                />
                
                  
              </div>
              <div>
                <ul className="list-group list-group-flush fs-5 align-items-start">
                  <li className="list-group-item ">
                    Name :  &nbsp;      
                  <span>
                      {this.state.profileData.userName}
                    </span>
                  </li>
                  <li className="list-group-item">
                    Email :  &nbsp;      
                  <span>
                      {this.state.profileData.userEmail}
                    </span>
                  </li>
                  {this.state.address.map((address: any) => (
                    <li className="list-group-item">
                      {" "}
                    Address :&nbsp; 
                      <span>
                        {address.line1} ,{address.line2}, {address.city},{" "}
                        {address.state} ,{address.pincode}.
                    </span>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm ms-5 float-end"
                        value={address.id}
                        onClick={delAddress}
                      >
                        <i className="fas fa-trash display-7"></i>
                      </button>
                    </li>
                  ))}
                 
                </ul>
              </div>
            </div>
            <div className="buttons">
              <NavLink to={"/address"}>
                    <button type="button" className="btn btn-warning fw-bold btn-sm m-3 mb-1">
                      Manage Address
                  </button>
                  </NavLink>
                  
                    <NavLink to="/cart"> <button type="button" className="btn btn-warning fw-bold btn-sm m-3 mb-0">
                      My Ordres
                  </button></NavLink>
              </div>
          </Column>
        </Row>
      </Container>
    );
  }
}

export default Profile;
