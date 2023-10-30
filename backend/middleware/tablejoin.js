exports.dynamicLookupMiddleware = (model, optionsArray) => async (req, res, next) => {
    try {
      let results = model.aggregate([]);
  
      for (const options of optionsArray) {
        results = results.lookup({
          from: options.fromCollection,
          localField: options.localField,
          foreignField: options.foreignField,
          as: options.as,
        });
      }
  
      results = await results.exec();
  
      return results;
    } catch (err) {
      return err;
    }
  };
  