import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Acordeon from "../Acordeon/Acordeon";
import "./EditProfile.css";
// import Avatar from '../Avatar/Avatar'

function EditProfile(props) {
  const login = useSelector((s) => s.login);
  const dispath = useDispatch();

  const id = login.user.id;

  const [email, setEmail] = useState(props.email);
  const [user_name, setName] = useState(props.user_name);
  const [surname, setSurname] = useState(props.surname);
  const [professional_profile, setProfessionalProfile] = useState(
    props.professional_profile
  );
  const [rol, setRol] = useState(props.rol);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmationPassword, setConfirmationPassword] = useState(null);
  // const [changePassword, setChangePassword] = useState(false)

  const handleClose = props.handleClose;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    const logo = e.target.profile_picture.files[0];

    console.log(logo);

    fd.append("profile_picture", logo);
    fd.append("email", email);
    fd.append("user_name", user_name);
    fd.append("surname", surname);
    fd.append("professional_profile", professional_profile);
    fd.append("rol", rol);

    if (currentPassword) {
      fd.append("currentPassword", currentPassword);
      fd.append("newPassword", newPassword);
      fd.append("passwordConfirmation", confirmationPassword);
    }

    const headers = {
      //   "Content-Type": "application/json",
      Authorization: login.token,
    };

    const ret = await fetch(`http://localhost:3001/user/${id}/update`, {
      headers,
      body: fd,
      method: "PUT",
    });

    const data = Object.assign({}, login);
    data.user.email = email;
    data.user.user_name = user_name;
    data.user.professional_profile = professional_profile;
    data.user.rol = rol;

    if (ret.status === 200) {
      dispath({ type: "login", data });
      alert("¡Se ha actualizado tu perfil!");
      handleClose();
      window.location.reload();
    } else {
      console.log(ret.body);
      alert(ret.statusText);
    }
  };

  const defaultUser = props.rol === "user" ? "defaultChecked" : null;
  const defaultOrganizer = props.rol === "organizer" ? "defaultChecked" : null;

  return (
    <div id="signup" className="signup">
      <form className="edit-profile-form" onSubmit={handleSubmit} method="put">
        {/* <Avatar/> */}
        <div id="edit-profile-avatar">
          Selecciona la foto principal de la portada
          <input type="file" name="profile_picture" accept="image/*" />
        </div>

        <div className="completeName">
          <div className="field fieldName">
            <label>Nombre:</label>
            <input
              type="text"
              value={user_name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="field fieldSurname">
            <label>Apellidos:</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field fieldEmail">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field fielProfessionalProfile">
          <label>Perfil profesional:</label>
          {/* <input type="text" list="profiles"
                        onChange={
                            e => setProfessionalProfile(e.target.value)
                        }
                        required/> */}
          <select
            id="profiles"
            defaultvalue="desarrollador"
            value={professional_profile}
            onChange={(e) => setProfessionalProfile(e.target.value)}
            required
          >
            <option value="desarrollador">Desarrollador</option>
            <option value="marqueting">Marqueting</option>
            <option value="diseñador">Diseñador</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="field fielProfile">
          <label>Tipo usuario:</label>
          <div className="rOption">
            <div id="rUser">
              <input
                type="radio"
                id="user"
                name="typeUser"
                value="user"
                onChange={(e) => setRol(e.target.value)}
                defaultChecked={defaultUser}
              />
              <label for="user">Usuario</label>
            </div>

            <div id="rOrganizer">
              <input
                type="radio"
                id="organizer"
                name="typeUser"
                value="organizer"
                onChange={(e) => setRol(e.target.value)}
                defaultChecked={defaultOrganizer}
              />
              <label for="organizer">Organizador</label>
            </div>
          </div>
        </div>

        <Acordeon button_text="Cambiar Contraseña">
          <div className="change-password-container">
            <div className="current-password">
              <label>Contraseña actual</label>
              <input
                type="password"
                minLength="8"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="new-password">
              <label>Nueva Contraseña</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="confirm-password">
              <label>Confirmar Contraseña</label>
              <input
                type="password"
                value={confirmationPassword}
                onChange={(e) => setConfirmationPassword(e.target.value)}
              />
              {confirmationPassword === newPassword ? null : (
                <div className="password-warning">
                  Las contraseñas no coinceden
                </div>
              )}
            </div>
          </div>
        </Acordeon>

        <button
          type="submit"
          className="button"
          disabled={confirmationPassword === newPassword ? false : true}
        >
          Actualizar Perfil
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
