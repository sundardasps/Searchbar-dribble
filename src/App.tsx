import { useEffect, useRef, useState } from "react";
import { Icon } from "./assets/icons";
import { data, filesTabType, tabs } from "./data";
import RowCard from "./components/RowCard";
import { RowCardSkeleton } from "./components/Skeleton";
import type { TabItemTypes } from "./types";

function App() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [show, setShow] = useState<TabItemTypes[]>(tabs.slice(0, 3));

  const [searchResults, setSearchResults] = useState<typeof data>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(60);

  // 🔹 Auto-focus input when search is cleared
  useEffect(() => {
    if (inputRef.current && search.length === 0) {
      inputRef.current.focus();
    }
  }, [search]);

  // 🔹 Adjust container height
  useEffect(() => {
    if (!contentRef.current) return;

    if (!searchQuery && searchResults.length === 0) {
      setHeight(60);
    } else if (searchQuery && searchResults.length === 0) {
      setHeight(343);
    } else {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [searchQuery, searchResults]);

  // 🔹 Search logic
  useEffect(() => {
    if (search.trim() === "") {
      setSearchQuery("");
      setSearchResults([]);
      setOpenDropdown(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const id = setTimeout(() => {
      const q = search.toLowerCase();
      const results = data.filter((item) =>
        item.title.toLowerCase().includes(q)
      );

      setSearchResults(results);
      setSearchQuery(search);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(id);
  }, [search]);

  // 🔹 Toggle tabs in dropdown
  const handleShow = (tabData: TabItemTypes) => {
    setShow((prev) =>
      prev.some((t) => t.title === tabData.title)
        ? prev.filter((t) => t.title !== tabData.title)
        : [...prev, tabData]
    );
  };

  // 🔹 Count items per tab
  const getTabCount = (tabTitle: string) => {
    if (tabTitle === "all") return searchResults.length;
    if (tabTitle === "files") {
      return searchResults.filter((item) => filesTabType.includes(item.type))
        .length;
    }
    return searchResults.filter((item) => item.type === tabTitle).length;
  };

  // 🔹 Filtered results
  const filteredData =
    selectedTab === "all"
      ? searchResults
      : selectedTab === "files"
      ? searchResults.filter((item) => filesTabType.includes(item.type))
      : searchResults.filter((item) => item.type === selectedTab);

  return (
    <div
      className="flex min-h-screen w-screen items-start justify-center p-4 md:p-0 relative "
      style={{
        backgroundImage:
          "url('https://framerusercontent.com/images/xRWyUsRfgGJ6Aa1H0rJNmK0OTOg.png?scale-down-to=1024')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="backdrop-blur-md  absolute w-full  h-full" />
        <div
          ref={contentRef}
          style={{ height, transition: "height 1s ease" }}
          className="md:min-w-lg  rounded-xl bg-white border-gray-200 shadow-md transition-all duration-1000 ease-in-out overflow-hidden mt-20 z-10 "
        >
          {/* 🔹 Search Input */}
          <form className="flex gap-2 items-center p-4 text-[11px] md:text-xl">
            {loading ? (
              <Icon.loader className="text-gray-400 min-w-6 min-h-6 animate-spin" />
            ) : (
              <Icon.search className="text-gray-400 min-w-6 min-h-6" />
            )}

            <input
              type="text"
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Searching is easier"
              className={`w-full outline-none  ${
                search ? "text-black" : "text-gray-600"
              }`}
            />

            {search ? (
              <span
                onClick={() => setSearch("")}
                className="text-gray-600 text-xs md:text-sm ml-auto cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-500 underline-animate"
              >
                Clear
              </span>
            ) : (
              <div className="flex items-center gap-1 text-gray-400 text-[10px] md:text-sm">
                <div className="w-7 h-8 flex justify-center items-center border rounded-xl border-gray-400">
                  s
                </div>
                <span className="whitespace-nowrap">quick access</span>
              </div>
            )}
          </form>

          {searchQuery && (
            <>
              {/* 🔹 Tabs */}
              <div className="flex justify-between px-4 border-b border-gray-200 relative">
                <ul className="flex overflow-auto no-scrollbar">
                  {show.map((item) => (
                    <li
                      key={item.title}
                      onClick={() => setSelectedTab(item.title)}
                      className={`flex items-end justify-center gap-1 text-xs font-extralight cursor-pointer p-2 h-8 ${
                        selectedTab === item.title
                          ? "border-b-2 border-black text-black "
                          : "border-b-2 border-transparent text-gray-400"
                      } transition-all duration-700 ease-in-out`}
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span className="capitalize text-xs font-semibold">{item.title}</span>
                      <span className="flex items-center justify-center bg-gray-100 rounded px-1">
                        {getTabCount(item.title)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* 🔹 Settings + Dropdown Wrapper */}
                <div
                  className="relative"
                  onMouseLeave={() => setOpenDropdown(false)}
                >
                  {/* Settings Icon */}
                  <div className="flex items-center justify-center rounded p-1">
                    <Icon.settings
                      onClick={() => setOpenDropdown((pre) => !pre)}
                      className={`w-4 h-4 transition duration-1000 cursor-pointer ${
                        openDropdown
                          ? "rotate-90 text-gray-900 scale-105"
                          : "text-gray-400"
                      }`}
                    />
                  </div>

                  {/* Dropdown */}
                  <div
                    className={`absolute right-0 top-9  rounded-xl bg-white z-50 border-gray-200 border shadow-md transition-all duration-300 ease-in-out ${
                      openDropdown
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-5 pointer-events-none"
                    }`}
                  >
                    {tabs.slice(1).map((item) => (
                      <li
                        key={item.title}
                        onClick={() => handleShow(item)}
                        className="flex items-center w-full gap-1 text-xs font-extralight text-gray-400 cursor-pointer p-2"
                      >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span
                          className={`mr-6 capitalize font-semibold ${
                            show.some((tab) => tab.title === item.title)
                              ? "text-black "
                              : ""
                          }`}
                        >
                          {item.title}
                        </span>
                        {show.some((tab) => tab.title === item.title) ? (
                          <Icon.toggleOn className="text-gray-900 h-5 w-5 ml-auto" />
                        ) : (
                          <Icon.toggleOff className="text-gray-400 h-5 w-5 ml-auto hover:text-black" />
                        )}
                      </li>
                    ))}
                  </div>
                </div>
              </div>

              {/* 🔹 Results */}
              <div className="p-4 max-h-96 min-h-96 overflow-auto no-scrollbar">
                {loading ? (
                  <div className="flex flex-col divide-y divide-gray-300">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <RowCardSkeleton key={i} />
                    ))}
                  </div>
                ) : filteredData.length > 0 ? (
                  <div className="flex flex-col divide-y divide-gray-200">
                    {filteredData.map((rowData, index) => (
                      <RowCard
                        data={rowData}
                        searchQury={searchQuery}
                        key={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-gray-900 justify-center my-20">
                    <Icon.notFound className="text-gray-400 w-10 h-10" />
                    <p className="text-gray-900 text-center text-md ">
                      No results for "{searchQuery}".
                    </p>
                    <span className="text-xs text-gray-400 ">
                      Try searching for something else.
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
     
    </div>
  );
}

export default App;
