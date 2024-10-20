function PickedFeaturesSection({ size, color, category, warranty }) {
  return (
    <div className="flex flex-col gap-1 text-sm 450:text-base">
      {size && (
        <div>
          <span>size: </span>
          <span className="font-bold uppercase">{size}</span>
        </div>
      )}
      {color && (
        <div>
          <span>color: </span>
          <span className="font-bold uppercase">{color}</span>
        </div>
      )}
      {warranty && (
        <div>
          <span>warranty: </span>
          <span className="font-bold uppercase">{warranty}</span>
        </div>
      )}
      <div>
        <span>category: </span>
        <span className="font-bold uppercase">{category}</span>
      </div>
    </div>
  );
}

export default PickedFeaturesSection;
