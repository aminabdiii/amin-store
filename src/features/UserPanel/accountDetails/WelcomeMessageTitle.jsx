function WelcomeMessageTitle({ fullName }) {
  return (
    <div>
      <h2 className="font-semibold capitalize text-gray-900 xxs:text-xl vxs:text-lg md:text-xl">
        Welcome, dear {fullName} 🙌
      </h2>
    </div>
  );
}

export default WelcomeMessageTitle;
