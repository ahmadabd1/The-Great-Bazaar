import "../../style/ClientProfile.css";

const UserInfoInput = ({ label, value, name, onChange, type = "text" }) => (
    <div className="mb-4 flex">
      <div className="w-1/3">
        <p className="font-mono text-lg text-sky-400">{label}</p>
      </div>
      <div className="w-2/3">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full font-mono text-lg text-slate-300"
        />
      </div>
    </div>
  );
  
  export default UserInfoInput;
  