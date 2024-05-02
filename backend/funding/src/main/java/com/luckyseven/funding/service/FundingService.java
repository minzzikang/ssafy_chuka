package com.luckyseven.funding.service;

import com.luckyseven.funding.dto.FundingCreateReq;
import com.luckyseven.funding.dto.FundingDetailRes;
import com.luckyseven.funding.dto.FundingRes;

import java.util.List;

public interface FundingService {
    int createFunding(FundingCreateReq dto, String userId);
    List<FundingRes> findFundings(int eventId);
    FundingDetailRes getFunding(int fundingId);
    List<FundingRes> getMyFunding(String userId);
}
