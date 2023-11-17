EXPRESS::::::::::::::
always use UserModel.create({}) instead of .save()--> for this we must add explicity _id to mongodb doc
with .save({new : true}) only available here not in store
