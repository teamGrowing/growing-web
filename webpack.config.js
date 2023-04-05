module.exports = {
  module: {
    rules: [
      {
        test: /\.(glb|gltf)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
