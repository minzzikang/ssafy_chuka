package com.luckyseven.funding.dto;

import com.luckyseven.funding.entity.Funding;
import com.luckyseven.funding.entity.FundingResult;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import java.io.Serializable;
import java.time.LocalDate;
import static lombok.AccessLevel.PRIVATE;

@Getter
@ToString
@RequiredArgsConstructor(access = PRIVATE)
public class FundingRes implements Serializable {

    private final Integer fundingId;
    private final Integer eventId;
    private final String introduce;
    private final FundingResult fundingResult;
    private final String productName;
    private final String productImage;
    private final LocalDate startDate;
    private final LocalDate endDate;
    public static FundingRes of(final Funding funding){
        return new FundingRes(
                funding.getFundingId(),
                funding.getEventId(),
                funding.getIntroduce(),
                funding.getResult(),
                funding.getProductName(),
                funding.getProductImage(),
                funding.getCreateTime().toLocalDate(),
                funding.getEndDate()
        );
    }
}


