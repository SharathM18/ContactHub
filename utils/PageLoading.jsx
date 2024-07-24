import "../src/assets/style/pageloading.css";

const PageLoading = () => {
  return (
    <>
      <div className="pageloading_containter container">
        <p>Loading, please wait...</p>

        <div className="newtons-cradle">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      </div>
    </>
  );
};

export default PageLoading;
