import * as React from "react";
import { Header, NomineeCard } from "../../../containers";
import { sp } from "@pnp/sp";
import styles from "./voting.module.scss";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import {
  SPHttpClient,
  SPHttpClientConfiguration,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
import { Context } from "../../../Mtnvoting";

const index = () => {
  const [nominees, setNominees] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [indexFrom, setIndexFrom] = React.useState(0);
  const [indexTo, setIndexTo] = React.useState(4);
  const { spHttpClient } = React.useContext(Context);

  const onNext = () => {
    setIndexTo((prev) => prev + 4);
    setIndexFrom((prev) => prev + 4);
  };
  const onPrev = () => {
    setIndexTo((prev) => prev - 4);
    setIndexFrom((prev) => prev - 4);
  };

  React.useEffect(() => {
    spHttpClient
      .get(
        `https://lotusbetaanalytics.sharepoint.com/sites/business_solutions/_api/lists/GetByTitle('CURRENT HCM STAFF LIST-test')/items`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          console.log(responseJSON.value);
        });
      });
  }, []);

  //Get all Nominees
  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`Nominees`)
      .items.skip(indexFrom)
      .top(indexTo)
      .filter(`Status eq 'Approved'`)
      .get()
      .then((res) => {
        console.log(res);
        setNominees(res);
      });
  }, []);
  //Get all Employees
  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`Registration`)
      .items.get()
      .then((res) => {
        console.log(res);
      });
  }, []);

  const votedNominee = (id) => {
    sp.web.lists
      .getByTitle(`Nominees`)
      .items.getById(id)
      .update({
        Status: "Voted",
      })
      .then(() => {
        sp.web.lists
          .getByTitle(`Nominees`)
          .items.filter(`Status eq 'Approved'`)
          .get()
          .then((res) => {
            setNominees(res);
          });
      });
  };

  return (
    <div className={styles.votingPageContainer}>
      <Header title="Nominees" />
      {indexFrom >= 4 && (
        <div className={styles.arrowLeft} onClick={onPrev}>
          <AiOutlineArrowLeft />
        </div>
      )}
      <div className={styles.nomineeContainerScreen}>
        {nominees.map((nominee) => {
          return (
            <div>
              <NomineeCard
                checked={checked}
                image={nominee.image}
                name={nominee.EmployeeName}
                lastName={nominee.lastName}
                onClick={() => {
                  votedNominee(nominee.id);
                }}
              />
            </div>
          );
        })}
      </div>

      {indexTo > 4 && (
        <div className={styles.arrowRight} onClick={onNext}>
          <AiOutlineArrowRight />
        </div>
      )}
    </div>
  );
};

export default index;
