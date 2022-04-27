import './app-wrapper.css';

function AppWrapper({ children }) {
    return (
      <div className="app-wrapper">
        {children}
      </div>
    )
}

export default AppWrapper;
