import { connect } from 'react-redux';
import styles from './faq.module.css';
import { mapStateToProps } from '@el-cap/store';
/* eslint-disable-next-line */
export interface FaqProps {}

export function Faq(props: FaqProps) {
  return (
    <div className="">
      <p className="font-semibold text-4xl text-center my-12">
        Frequently Asked Questions
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-2/3">
          <div className="mb-14">
            <p className="font-semibold text-2xl mb-5">
              How are the prices calculated for the various cryptocurrencies?
            </p>
            <p>
              Please refer to the{' '}
              <span className="text-blue-700">Market Data</span> section of the
              methodology for detailed information on this topic.
            </p>
          </div>
          <div className="mb-14">
            <p className="font-semibold text-2xl mb-5">
              What is <span className="italic">"Market Capitalization"</span>{' '}
              and how is it calculated?
            </p>
            <p className="mb-5">
              Market Capitalization is one way to rank the relative size of a
              cryptocurrency. It's calculated by multiplying the Price by the
              Circulating Supply.
            </p>
            <p>Market Cap = Price X Circulating Supply.</p>
          </div>
          <div className="mb-14">
            <p className="font-semibold text-2xl mb-5">
              What is the difference between{' '}
              <span className="italic">
                "Circulating Supply", "Total Supply",
              </span>{' '}
              and <span className="italic">"Max Supply"</span>?
            </p>
            <p>
              Circulating Supply is the best approximation of the number of
              coins that are circulating in the market and in the general
              public's hands.
            </p>
            <p>
              <span className="italic">Total Supply</span> is the total amount
              of coins in existence right now (minus any coins that have been
              verifiably burned).
            </p>
            <p>
              <span className="italic">Max Supply</span> is the best
              approximation of the maximum amount of coins that will ever exist
              in the lifetime of the cryptocurrency.
            </p>
          </div>
          <div className="mb-14">
            <p className="font-semibold text-2xl mb-5">
              Why is the Circulating Supply used in determining the market
              capitalization instead of Total Supply?
            </p>
            <p>
              We've found that Circulating Supply is a much better metric for
              determining the market capitalization. Coins that are locked,
              reserved, or not able to be sold on the public market are coins
              that can't affect the price and thus should not be allowed to
              affect the market capitalization as well. The method of using the
              Circulating Supply is analogous to the method of using{' '}
              <span className="text-blue-700">public float</span> for
              determining the market capitalization of companies in traditional
              investing.
            </p>
          </div>
          <div className="mb-14">
            <p className="font-semibold text-2xl mb-5">
              What is the difference between a "Coin" and a "Token" on the site?
            </p>
            <p className="mb-5">
              A Coin is a cryptocurrency that can operate independently.
            </p>
            <p>
              A Token is a cryptocurrency that depends on another cryptocurrency
              as a platform to operate. Check out the{' '}
              <span className="text-blue-700">crypto tokens listings</span> to
              view a list of tokens and their respective platforms.
            </p>
          </div>
          <div className="mb-14">
            <p className="font-semibold text-2xl mb-5">
              What is the criteria for a cryptocurrency or exchange to be listed
              on CoinMarketCap?
            </p>
            <p className="mb-5">
              Please refer to the{' '}
              <span className="text-blue-700">Listings Criteria</span> section
              of the methodology for detailed information on this topic.
            </p>
          </div>
          <div className="mb-14">
            <p className="font-semibold text-2xl mb-5">
              Why I no longer see the affiliate links for Exchanges on
              CoinMarketCap?
            </p>
            <p className="mb-5">
              We discontinued the Affiliate Program due to compliance reasons.
              Hence, the affiliate links to all the Affiliate Program
              participant exchanges were removed.
            </p>
          </div>
          <div className="mb-14">
            <p className="font-semibold text-2xl mb-5">
              How do I purchase cryptocurrency?
            </p>
            <p className="mb-5">
              CoinMarketCap reports on the trading activities of thousands of
              markets but does not directly sell any cryptocurrency. The best
              way to find where to buy is by looking on the markets section for
              the cryptocurrency. For example, to find where to buy Bitcoin, you
              can look at the{' '}
              <span className="text-blue-700">markets section for Bitcoin</span>
              .
            </p>
          </div>
          <div className="mb-14">
            <p className="font-semibold text-2xl mb-5">
              In what time zone is the site based?
            </p>
            <p className="mb-5">
              Data is collected, recorded, and reported in UTC time unless
              otherwise specified.
            </p>
          </div>
          <div className="mb-14">
            <p className="font-semibold text-2xl mb-5">
              At what time is the 24 hour % change based?
            </p>
            <p className="mb-5">
              It's based on the current time. It's a rolling 24 hour period.
            </p>
          </div>
          <div className="mb-14">
            <p className="font-semibold text-2xl mb-5">
              Why are you listing [insert random cryptocurrency]? It's clearly a
              scam!
            </p>
            <p className="mb-5">
              Nearly every cryptocurrency has been called a scam at some point
              in its lifetime. We're not here to judge the merits of any
              cryptocurrency, but we provide the best tools for you to make your
              own conclusions. As long as it meets the{' '}
              <span className="text-blue-700">listing criteria</span>, it's
              eligible to be on the site.
            </p>
          </div>
          <div className="mb-14">
            <p className="font-semibold text-2xl mb-5">
              Why aren't you listing [insert random cryptocurrency]?
            </p>
            <p className="mb-5">
              While we strive to add every single cryptocurrency in the
              universe, it's virtually impossible to list everything. Listing
              cryptocurrencies is largely a manual process that takes time and
              resources to ensure the accuracy of our data. Please refer to the{' '}
              <span className="text-blue-700">Listings Criteria</span> section
              of the methodology for detailed information on this topic.
            </p>
          </div>
          <div className="mb-14">
            <p className="font-semibold text-2xl mb-5">
              Do you offer an API for your data?
            </p>
            <p className="mb-5">
              Yes! Check out the{' '}
              <span className="text-blue-700">CoinMarketCap API</span>.
            </p>
          </div>
          <div className="mb-14">
            <p className="font-semibold text-2xl mb-5">
              Am I allowed to use content (screenshots, data, graphs, etc.) for
              one of my personal projects and/or commercial use?
            </p>
            <p className="mb-5">
              You may use the content for academic or journalistic use provided
              that you cite coinmarketcap.com as a source. Please refer to the{' '}
              <span className="text-blue-700">Terms of Use</span> for the
              website.
            </p>
          </div>
          <div className="mb-14">
            <p className="font-semibold text-2xl mb-5">
              Why does a question mark sometimes show up for the circulating
              supply and market cap of a cryptocurrency?
            </p>
            <p className="mb-5">
              In order to ensure accurate market cap rankings, we work closely
              with teams and developers to verify supply details on their
              respective blockchains. If a question mark shows up, it means that
              we have not sufficiently verified the circulating supply and
              resulting market cap yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;

export const ConnectedFaq = connect(mapStateToProps, (dispatch) => ({
  goToCoin: (ticker: string, entity: any) =>
    dispatch({ type: 'COIN', payload: { ticker, entity } }),
  goToFeed: (key: string) => dispatch({ type: 'FEED', payload: { key } }),
}))(Faq);
