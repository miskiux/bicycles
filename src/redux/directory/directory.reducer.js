const INITIAL_STATE = {
  sections: [
    {
      title: "Vintage",
      id: 0,
      linkUrl: "shop/vintage",
    },
    {
      title: "Off-road",
      id: 1,
      linkUrl: "shop/off-road",
    },
    {
      title: "City bicycle",
      size: "large",
      id: 2,
      linkUrl: "shop/city bicycle",
    },
    {
      title: "Road bicycle",
      id: 3,
      linkUrl: "shop/road",
    },
    {
      title: "See all",
      id: 4,
      linkUrl: "shop/",
    },
  ],
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
