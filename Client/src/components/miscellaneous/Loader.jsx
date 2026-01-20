const Loader = () => {
  const loaderStyle = {
    width: "40px",
    height: "40px",
    border: "4px solid #e5e5e5",
    borderTop: "4px solid #000",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "auto",
  };

  return (
    <>
      <div style={loaderStyle}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default Loader;
