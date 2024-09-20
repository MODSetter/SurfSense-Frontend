import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Metas = ({ meta }: { meta: string }) => {

  const data = JSON.parse(meta)
  return (
    <Table>
      <TableBody>

        <TableRow key={1}>
          <TableCell className="font-bold">Session Id</TableCell>
          <TableCell>{data.BrowsingSessionId}</TableCell>
        </TableRow>

        <TableRow key={2}>
          <TableCell className="font-bold">Date and Time</TableCell>
          <TableCell>{data.VisitedWebPageDateWithTimeInISOString}</TableCell>
        </TableRow>

        <TableRow key={3}>
          <TableCell className="font-bold">URL</TableCell>
          <TableCell>{data.VisitedWebPageURL}</TableCell>
        </TableRow>

        <TableRow key={4}>
          <TableCell className="font-bold">Refferer URL</TableCell>
          <TableCell>{data.VisitedWebPageReffererURL}</TableCell>
        </TableRow>

        <TableRow key={5}>
          <TableCell className="font-bold">Title</TableCell>
          <TableCell>{data.VisitedWebPageTitle}</TableCell>
        </TableRow>

        <TableRow key={6}>
          <TableCell className="font-bold">Duration(milliseconds)</TableCell>
          <TableCell>{data.VisitedWebPageVisitDurationInMilliseconds}</TableCell>
        </TableRow>

      </TableBody>
    </Table>
  )
}

export default Metas