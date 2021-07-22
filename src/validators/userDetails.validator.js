// const Joi = require('@hapi/joi');

// const { messages } = require('../constants/index');

// module.exports.getUserDetails = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.USERID_REQUIRED))
// });

// module.exports.reSendEmail = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.USERID_REQUIRED)),
//     email: Joi.string().email().required().trim().error(new Error(messages.INVALID_EMAIL))
// });

// module.exports.getState = Joi.object({
//     countryId: Joi.string().required().trim().error(new Error(messages.INVALID_COUNTRY))
// })

// module.exports.getAgencyDashboardRequest = Joi.object({
//     serviceType: Joi.string().required().trim().error(new Error(messages.INVALID_SERVICE_TYPE)),
//     year: Joi.number().required().error(new Error(messages.INVALID_YEAR)),
//     agencyId: Joi.any()
// })
// module.exports.getAgencyDashboardAgentRequest = Joi.object({
//     serviceType: Joi.string().required().trim().error(new Error(messages.INVALID_SERVICE_TYPE)),
//     year: Joi.number().required().error(new Error(messages.INVALID_YEAR)),
//     agentId: Joi.any(),
// })
// module.exports.getCity = Joi.object({
//     stateId: Joi.string().required().trim().error(new Error(messages.INVALID_STATE))
// })

// module.exports.addAddress = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.USERID_REQUIRED)),
//     address: Joi.object({
//         line1: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_ADDRESS)),
//         line2: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_ADDRESS)),
//         city: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_CITY)),
//         state: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_STATE)),
//         pin: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_PINCODE)),
//         country: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_COUNTRY)),
//         addressType: Joi.string().optional().allow("C", "R").trim().error(new Error(messages.INVALID_ADDRESS_TYPE)),
//     }),
// })

// module.exports.getAddress = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.USERID_REQUIRED))
// })
// module.exports.updateAddress = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.USERID_REQUIRED)),
//     addressId: Joi.string().required().trim().error(new Error(messages.ADDRESSID_REQUIRED)),
//     address: Joi.object({
//         line1: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_ADDRESS)),
//         line2: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_ADDRESS)),
//         city: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_CITY)),
//         state: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_STATE)),
//         pin: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_PINCODE)),
//         country: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_COUNTRY)),
//         addressType: Joi.string().optional().allow("C", "R").trim().error(new Error(messages.INVALID_ADDRESS_TYPE)),
//     })
// })

// module.exports.updateInfo = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.INVALID_USER_ID)),
//     firstName: Joi.string().required().trim().error(new Error(messages.FIRSTNAME_NOT_NULL)),
//     middleName: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_NAME)),
//     lastName: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_NAME)),
//     email: Joi.string().email().optional().trim().error(new Error(messages.INVALID_EMAIL)),
// });

// module.exports.updateProfileData = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.USERID_REQUIRED)),
//     mobileNumber: Joi.string().optional().allow("").error(new Error(messages.INVALID_MOBILE_NUMBER)),
//     email: Joi.string().optional().allow("").error(new Error(messages.INVALID_EMAIL)),
//     age: Joi.string().min(0).max(2).optional().allow("").error(new Error(messages.INVALID_AGE)),
//     dob: Joi.string().required().trim().error(new Error(messages.INVALID_DATE_OF_BIRTH)),
//     gender: Joi.string().required().trim().error(new Error(messages.INVALID_GENDER)),
//     fatherName: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_NAME)),
// });

// module.exports.uploadVideo = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.USERID_REQUIRED)),
//     text: Joi.array().items(Joi.string().trim().required()).error(new Error(messages.TEXT_NOT_NUll))
// })

// module.exports.getProfileDetails = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.USERID_REQUIRED)),
// })

// module.exports.setEntityId = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.USERID_REQUIRED)),
//     packet: Joi.object().error(new Error(messages.ENTITYID_REQUIRED)),
// })

// module.exports.updateProfile = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.USERID_REQUIRED)),
//     firstName: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_NAME)),
//     // mobileNumber: Joi.string().required().regex(/[0-9]/).trim().error(new Error(messages.INVALID_MOBILE_NUMBER)),
//     mobileNumber: Joi.any(),
//     email: Joi.string().email().required().trim().error(new Error(messages.INVALID_EMAIL)),
//     // eClass: Joi.string().optional().trim().error(new Error(messages.INVALID_ECLASS)),
//     eClass: Joi.any(),
//     isReview: Joi.boolean().required().error(new Error(messages.INVALID_ADDRESS)),
//     address: Joi.array().items({
//         line1: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_ADDRESS)),
//         line2: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_ADDRESS)),
//         city: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_CITY)),
//         state: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_STATE)),
//         pin: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_PINCODE)),
//         country: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_COUNTRY)),
//         addressType: Joi.string().optional().allow("C", "R").trim().error(new Error(messages.INVALID_ADDRESS_TYPE)),
//     }),
//     avatar: Joi.string().optional().allow("").trim().error(new Error(messages.INVALID_AVATAR)),
// });

// module.exports.updateIndividualProfile = Joi.object({
//     orgName: Joi.string().required().trim().error(new Error(messages.INVALID_NAME)),
//     mobile: Joi.string().required().regex(/[0-9]/).trim().error(new Error(messages.INVALID_MOBILE_NUMBER)),
//     email: Joi.string().email().optional().trim().error(new Error(messages.INVALID_EMAIL)),
// });

// module.exports.getKycUserDetails = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.INVALID_LINK_ID))
// });

// module.exports.getKycUserDocument = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.INVALID_USER_ID)),
//     viewId: Joi.string().required().trim().error(new Error(messages.INVALID_VIEW_ID))
// });

// module.exports.requestBG = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.INVALID_USER_ID)),
//     reqSlotTime: Joi.string().required().trim().error(new Error(messages.INVALID_REQ_SLOT)),
//     slots: Joi.string().required().trim().error(new Error(messages.SLOTS_REQUIRED)),
//     url: Joi.any(),
//     area: Joi.any(),
//     agencyId: Joi.any(),
//     agencyName: Joi.any(),
//     agencyNumber: Joi.any()
// })

// module.exports.requestIPV = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.INVALID_USER_ID)),
//     requestDate: Joi.string().required().trim().error(new Error(messages.INVALID_REQ_SLOT)),
//     slots: Joi.string().required().trim().error(new Error(messages.SLOTS_REQUIRED)),
//     docs: Joi.any(),
//     url: Joi.any(),
//     area: Joi.any(),
//     agencyId: Joi.any(),
//     agencyName: Joi.any(),
//     agencyNumber: Joi.any()
// })

// module.exports.getVerificationStsByIdOrType = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.INVALID_USER_ID)),
//     requestId: Joi.string().required().trim().error(new Error(messages.INVALID_REQUEST_TYPE)),
//     type: Joi.string().valid("BG", "IPV").required().trim().error(new Error(messages.INVALID_REQUEST_TYPE))
// })

// module.exports.enableDisableReview = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.INVALID_USER_ID)),
//     isReview: Joi.boolean().required().error(new Error(messages.INVALID_ADDRESS))
// })

// module.exports.updateReportStatus = Joi.object({
//     id: Joi.string().required().trim().error(new Error(messages.INVALID_USER_ID)),
//     status: Joi.string().required().error(new Error(messages.STATUS_REQUIRED)),
//     type: Joi.string().valid("BG", "IPV", "ABG").error(new Error(messages.TYPE_REQUIRED)),
//     mobileNumber: Joi.string().required().trim().error(new Error(messages.INVALID_MOBILE_NUMBER)),
//     otp: Joi.string().required().trim().error(new Error(messages.INVALID_OTP))
// })

// module.exports.createHappyCode = Joi.object({
//     mobileNumber: Joi.string().required().trim().error(new Error(messages.INVALID_MOBILE_NUMBER)),
// })

// module.exports.uploadDoc = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.INVALID_USER_ID)),
// });

// module.exports.uploadMultipleDoc = Joi.object({
//     userId: Joi.string().required().trim().error(new Error(messages.INVALID_USER_ID)),
// });

// module.exports.getDocument = Joi.object({
//     documentType: Joi.string().required().trim().error(new Error(messages.DOCUMENT_NOT_FOUND)),
// });

// module.exports.getLatLangByAddress = Joi.object({
//     address: Joi.string().required().trim().error(new Error(messages.ADDRESSID_REQUIRED)),
// });

// module.exports.getMultiStateCity = Joi.object({
//     statesIds: Joi.array().required().error(new Error(messages.INVALID_STATE))
// })
// module.exports.getMultiPinByCity = Joi.object({
//     districtName: Joi.array().required().error(new Error(messages.INVALID_STATE))
// })

// module.exports.checkTAT = Joi.object({
//     userId: Joi.string().required().error(new Error(messages.INVALID_USER_ID))
// })


// module.exports.watermarking = Joi.object({
//     userId: Joi.string().required().error(new Error(messages.USERID_REQUIRED)),
//     docList: Joi.array().required().error(new Error(messages.DOC_LIST_REQUIRED)),
// });